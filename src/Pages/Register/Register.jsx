import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    PDFViewer, pdf,
} from '@react-pdf/renderer';
import {
    Row, Col, Modal, ModalHeader, ModalBody, Spinner,
} from 'reactstrap';
import Title from '../../Components/Title/Title';
import Select from '../../Components/Select/Select';
import Button from '../../Components/Button/Button';
import Simple from '../../Components/Simple/Simple';
import Multiple from '../../Components/Multiple/Multiple';
import Input from '../../Components/Input/Input';
import Photo from '../../Components/Photo/Photo';
import Comments from '../../Components/Comments/Comments';
import Doc from './Doc';
import {
    getClients, getMachines, getConstructionsByClient, getForm, sendRegister,
} from '../../Service/Api';

import './Register.scss';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            formData: {},
            formFields: [],
            clients: [],
            clientSelected: {},
            constructions: [],
            constructionSelected: {},
            machines: [],
            machineSelected: {},
            form: {
                model_section: [
                    {
                        model_field: [],
                    },
                ],
            },
            errors: {},
            showing: false,
            ready: false,
            loading: false,
            loadingForm: false,
            loadingClients: false,
            loadingConstructions: false,
            loadingMachines: false,
        };
        this.onChange = this.onChange.bind(this);
        this.onChangeFormField = this.onChangeFormField.bind(this);
        this.onChangeClient = this.onChangeClient.bind(this);
        this.onChangeConstruction = this.onChangeConstruction.bind(this);
        this.onChangeMachine = this.onChangeMachine.bind(this);
        this.handleSend = this.handleSend.bind(this);
        this.handlePreview = this.handlePreview.bind(this);
        this.validForm = this.validForm.bind(this);
        this.validDynamicForm = this.validDynamicForm.bind(this);
        this.getControl = this.getControl.bind(this);
        this.toggle = this.toggle.bind(this);
        this.send = this.send.bind(this);
    }

    componentDidMount() {
        this.loadClients();
        this.loadMachines();
    }

    onChangeClient(event) {
        const { value } = event.target;
        const { clients, data } = this.state;
        this.onChange(event);
        const clientSelected = clients.find((item) => item.id === parseInt(value));
        data.construction = '-1';
        this.setState({
            clientSelected,
            data,
            constructionSelected: {},
        });
        this.loadConstructionsByClientId(parseInt(value));
    }

    onChangeConstruction(event) {
        const { value } = event.target;
        const { constructions } = this.state;
        this.onChange(event);
        const constructionSelected = constructions.find((item) => item.id === parseInt(value));
        this.setState({
            constructionSelected,
        });
    }

    async onChangeMachine(event) {
        const { value } = event.target;
        const { machines } = this.state;
        this.setState({ loadingForm: true });

        this.onChange(event);
        const machineSelected = machines.find((item) => item.id === parseInt(value));

        await getForm(machineSelected.model_form_id).then((response) => {
            this.setState({
                form: response.data,
                formFields: this.parseForm(response.data),
                machineSelected,
                loadingForm: false,
            });
        });
    }

    onChange(event) {
        const { name, value } = event.target;
        const { data, errors } = this.state;
        data[name] = value;
        errors[name] = '';
        this.setState({
            data,
            errors,
        });
    }

    onChangeFormField(event) {
        const {
            name, value, type, checked,
        } = event.target;
        const { formData, errors } = this.state;
        formData[name] = type === 'checkbox' ? checked : value;
        errors[name] = '';
        this.setState({
            formData,
            errors,
        });
    }

    parseForm = (form) => {
        const fields = [];
        form.model_section.forEach((section) => {
            section.model_field.forEach((field) => {
                fields.push({
                    value: null,
                    comments: '',
                    model_field_id: field.id,
                    type: field.type,
                    model_section_id: field.model_section_id,
                    required: field.required,
                });
            });
        });
        fields.sort((a, b) => a.model_field_id - b.model_field_id);
        return fields;
    }

    getControl = (field) => {
        const { errors, formData } = this.state;
        const comments = field.comments === 1;
        const props = {
            required: field.required === 1,
            name: `field-${field.id}`,
            label: field.name,
            onChange: this.onChangeFormField,
            errors,
            value: formData[`field-${field.id}`],
        };

        switch (field.type) {
            case 'multiple':
                return (
                    <>
                        <Multiple
                            options={field.options}
                            {...props}
                        />
                        {comments && <Comments {...props} />}
                    </>
                );
            case 'image':
                return (
                    <>
                        <Photo {...props} />
                        {comments && <Comments {...props} />}
                    </>
                );
            case 'simple':
                return (
                    <>
                        <Simple {...props} />
                        {comments && <Comments {...props} />}
                    </>
                );
            case 'text':
                return (
                    <>
                        <Input {...props} />
                        {comments && <Comments {...props} />}
                    </>
                );
            default:
                return null;
        }
    }


    handleSend() {
        if (this.validForm() && this.validDynamicForm()) {
            const {
                form, formData, clientSelected, constructionSelected, machineSelected,
            } = this.state;
            const { type } = this.props;

            pdf(<Doc
                form={form}
                client={clientSelected}
                construction={constructionSelected}
                machine={machineSelected}
                type={type}
                data={formData}
            />).toBlob()
                .then((pdfBlob) => {
                    const reader = new window.FileReader();
                    reader.readAsDataURL(pdfBlob);
                    reader.onloadend = () => {
                        const base64data = reader.result;
                        this.send(base64data);
                    };
                });
        }
    }

    async send(file) {
        const { formFields, constructionSelected, machineSelected } = this.state;
        const { type } = this.props;
        this.toggleLoading(true);

        formFields.forEach((item) => {
            const field = item;
            delete field.required;
        });

        const params = {
            type,
            machine_id: machineSelected.id,
            construction_id: constructionSelected.id,
            file,
            fields: formFields,
        };

        await sendRegister(params).then((response) => {
            if (response && response.status === 201) {
                alert("Enviado");
                this.setState({
                    data: {},
                    formData: {},
                    formFields: [],
                    clientSelected: {},
                    constructionSelected: {},
                    machineSelected: {},
                    form: {
                        model_section: [
                            {
                                model_field: [],
                            },
                        ],
                    },
                    errors: {},
                    showing: false,
                    ready: false,
                    loading: false,
                });
            } else {
                this.setState({
                });
            }
        }).catch(() => {
            this.setState({
            });
        });
        this.toggleLoading(false);
    }

    handlePreview() {
        if (this.validForm() && this.validDynamicForm()) {
            this.toggle();
        }
    }

    async loadConstructionsByClientId(id) {
        this.setState({ loadingConstructions: true });
        await getConstructionsByClient(id)
            .then((response) => {
                this.setState({
                    constructions: response.data.construction,
                    loadingConstructions: false,
                });
            });
    }

    async loadClients() {
        this.setState({ loadingClients: true });
        await getClients().then((response) => {
            this.setState({
                clients: response.data,
                loadingClients: false,
            });
        });
    }

    async loadMachines() {
        this.setState({ loadingMachines: true });
        await getMachines().then((response) => {
            this.setState({
                machines: response.data,
                loadingMachines: false,
            });
        });
    }

    validForm() {
        const { data } = this.state;
        const { client, construction, machine } = data;
        const errors = {};
        let formIsValid = true;

        if (!client) {
            formIsValid = false;
            errors.client = ['Requerido'];
        }

        if (!construction) {
            formIsValid = false;
            errors.construction = ['Requerido'];
        }

        if (!machine) {
            formIsValid = false;
            errors.machine = ['Requerido'];
        }

        this.setState({
            errors,
        });

        return formIsValid;
    }

    validDynamicForm() {
        let formIsValid = true;

        const { formFields, formData, errors } = this.state;

        formFields.forEach((item) => {
            const field = item;
            field.value = formData[`field-${field.model_field_id}`] || null;
            field.comments = formData[`comment_field-${field.model_field_id}`] || null;

            if (field.required === 1 && !field.value) {
                formIsValid = false;
                errors[`field-${field.model_field_id}`] = ['Requerido'];
            }
        });

        this.setState({
            formFields,
            errors,
        });
        return formIsValid;
    }

    toggle() {
        this.setState((prevState) => ({
            showing: !prevState.showing,
            ready: false,
        }), () => {
            setTimeout(() => {
                this.setState({ ready: true });
            }, 1);
        });
    }

    toggleLoading(value) {
        this.setState({
            loading: value,
        });
    }

    render() {
        const {
            errors, clients, machines, constructions, form, data, showing, ready,
            formData, clientSelected, constructionSelected, machineSelected, loading,
            loadingForm, loadingClients, loadingConstructions, loadingMachines,
        } = this.state;
        const {
            client, machine, construction,
        } = data;
        const { type } = this.props;

        return (
            <div className="check-in-container">
                <Title text="Datos generales" />

                <div className="check-in-container__section">
                    <Row>
                        <Col md={6}><Select name="client" required label="Cliente" options={clients} placeholder="Seleccione..." onChange={this.onChangeClient} value={client} errors={errors} loading={loadingClients} /></Col>
                        <Col md={6}><Select name="construction" required label="Obra" options={constructions} placeholder="Seleccione..." onChange={this.onChangeConstruction} value={construction} loading={loadingConstructions} errors={errors} /></Col>
                        <Col md={6}><Select name="machine" required label="Máquina" options={machines} placeholder="Seleccione..." value={machine} onChange={this.onChangeMachine} errors={errors} loading={loadingMachines} /></Col>
                    </Row>
                </div>

                {loadingForm && (
                    <div className="simple-loading-container">
                        <Spinner />
                    </div>
                )}

                {!loadingForm && form.model_section.map((section) => (
                    <>
                        <Row>
                            <Col md={12}>
                                {form.name && <Title text={form.name} />}
                            </Col>
                        </Row>

                        <Row className="check-in-container__section" key={`section${section.id}`}>
                            <Col md={12}>
                                {section.name && <Title text={section.name} />}
                            </Col>

                            {section.model_field.map((field) => (
                                <Col md={6} key={`field${field.id}`} className="check-in-container__field">
                                    {this.getControl(field)}
                                </Col>
                            ))}

                        </Row>
                    </>
                ))}

                <div className="form-footer">
                    <Button text="Vista previa" onClick={this.handlePreview} disabled={loadingForm} />
                </div>
                <div className="form-footer">
                    {loading && <div className="spinner"><Spinner /></div>}
                    <Button text="Enviar" onClick={this.handleSend} disabled={loadingForm} />
                </div>

                <Modal isOpen={showing} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle} />
                    <ModalBody>
                        {ready && (
                            <PDFViewer width="100%" height="300px">
                                <Doc
                                    form={form}
                                    client={clientSelected}
                                    construction={constructionSelected}
                                    machine={machineSelected}
                                    type={type}
                                    data={formData}
                                />
                            </PDFViewer>
                        )}
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

Register.propTypes = {
    type: PropTypes.string.isRequired,
};

export default Register;
