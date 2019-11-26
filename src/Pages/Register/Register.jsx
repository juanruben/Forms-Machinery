import React, { Component } from 'react';
import {
    Document, Page, Text, View, StyleSheet, PDFViewer, PDFDownloadLink,
} from '@react-pdf/renderer';
import {
    Row, Col, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import Title from '../../Components/Title/Title';
import Select from '../../Components/Select/Select';
import Button from '../../Components/Button/Button';
import Simple from '../../Components/Simple/Simple';
import Multiple from '../../Components/Multiple/Multiple';
import Input from '../../Components/Input/Input';
import Photo from '../../Components/Photo/Photo';
import Comments from '../../Components/Comments/Comments';
import {
    getClients, getMachines, getConstructionsByClient, getForm,
} from '../../Service/Api';

import './Register.scss';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            formData: {},
            clients: [],
            constructions: [],
            machines: [],
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
        };
        this.onChange = this.onChange.bind(this);
        this.onChangeFormField = this.onChangeFormField.bind(this);
        this.onChangeClient = this.onChangeClient.bind(this);
        this.onChangeMachine = this.onChangeMachine.bind(this);
        this.handleSend = this.handleSend.bind(this);
        this.handlePreview = this.handlePreview.bind(this);
        this.validForm = this.validForm.bind(this);
        this.getControl = this.getControl.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        this.loadClients();
        this.loadMachines();
    }

    onChangeClient(event) {
        const { value } = event.target;
        this.onChange(event);
        this.loadConstructionsByClientId(parseInt(value));
    }

    async onChangeMachine(event) {
        const { value } = event.target;
        const { machines } = this.state;

        this.onChange(event);
        const machine = machines.find((item) => item.id === parseInt(value));

        await getForm(machine.model_form_id).then((response) => {
            console.log("FORM", response);
            this.setState({
                form: response.data,
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

    getControl = (field) => {
        const { errors, formData } = this.state;
        const comments = field.comments === 1;
        const props = {
            required: field.required === 1,
            name: String(field.id),
            label: field.name,
            onChange: this.onChangeFormField,
            errors,
            value: formData[field.id],
        };
        console.log("CAMPO", field, comments);
        switch (field.type) {
            case 'multiple':
                return (
                    <>
                        <Multiple
                            options={field.options}
                            {...props}
                        />
                        {comments && <Comments name={field.id} onChange={this.onChangeFormField} />}
                    </>
                );
            case 'image':
                return (
                    <>
                        <Photo {...props} />
                        {comments && <Comments name={field.id} onChange={this.onChangeFormField} />}
                    </>
                );
            case 'simple':
                return (
                    <>
                        <Simple {...props} />
                        {comments && <Comments name={field.id} onChange={this.onChangeFormField} />}
                    </>
                );
            case 'text':
                return (
                    <>
                        <Input {...props} />
                        {comments && <Comments name={field.id} onChange={this.onChangeFormField} />}
                    </>
                );
            default:
                return null;
        }
    }


    handleSend = () => {
        alert('send');
    }

    handlePreview() {
        if (this.validForm()) {
            this.toggle();
        }
    }

    async loadConstructionsByClientId(id) {
        await getConstructionsByClient(id)
            .then((response) => {
                this.setState({
                    constructions: response.data.construction,
                });
            });
    }

    async loadClients() {
        await getClients().then((response) => {
            this.setState({
                clients: response.data,
            });
        });
    }

    async loadMachines() {
        await getMachines().then((response) => {
            this.setState({
                machines: response.data,
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

    render() {
        const {
            errors, clients, machines, constructions, form, data, showing, ready,
        } = this.state;
        const { client, machine, construction } = data;

        const styles = StyleSheet.create({
            page: {
                flexDirection: 'row',
                backgroundColor: '#FFF',
            },
            section: {
                margin: 10,
                padding: 10,
                flexGrow: 1,
                fontSize: 100,
                fontWeight: 700,
                color: '#CCC',
            },
            text: {
                color: '#F00',
                margin: 10,
                padding: 10,
                flexGrow: 1,
                fontSize: 12,
            },
        });

        const doc = (
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                        <Text>PDF Icafal</Text>
                    </View>
                </Page>
            </Document>
        );

        return (
            <div className="check-in-container">
                <Title text="Datos generales" />

                <div className="check-in-container__section">
                    <Row>
                        <Col md={6}><Select name="client" required label="Cliente" options={clients} placeholder="Seleccione..." onChange={this.onChangeClient} value={client} errors={errors} /></Col>
                        <Col md={6}><Select name="construction" required label="Obra" options={constructions} placeholder="Seleccione..." onChange={this.onChange} value={construction} errors={errors} /></Col>
                        <Col md={6}><Select name="machine" required label="Código de máquina" options={machines} placeholder="Seleccione..." value={machine} onChange={this.onChangeMachine} errors={errors} /></Col>
                    </Row>
                </div>
                <Row>
                    <Col md={12}>
                        {form.name && <Title text={form.name} />}
                    </Col>
                </Row>

                {form.model_section.map((section) => (
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
                ))}
                <div className="form-footer">
                    <Button text="Revisar" onClick={this.handlePreview} />
                </div>






                <Modal isOpen={showing} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle} />
                    <ModalBody>
                        {ready && (
                            <PDFViewer width="100%" height="300px">
                                {doc}
                            </PDFViewer>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        {ready && (
                            <div className="form-footer">
                                <Button text="Enviar" onClick={this.handleSend} />
                            </div>
                        )}
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default Register;
