import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Title from '../../Components/Title/Title';
import Select from '../../Components/Select/Select';
import Button from '../../Components/Button/Button';
import Simple from '../../Components/Simple/Simple';
import Multiple from '../../Components/Multiple/Multiple';
import Input from '../../Components/Input/Input';
import Photo from '../../Components/Photo/Photo';
import {
    getClients, getMachines, getConstructionsByClient, getForm,
} from '../../Service/Api';

import './CheckIn.scss';

class CheckIn extends Component {
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
        };
        this.onChange = this.onChange.bind(this);
        this.onChangeFormField = this.onChangeFormField.bind(this);
        this.onChangeClient = this.onChangeClient.bind(this);
        this.onChangeMachine = this.onChangeMachine.bind(this);
        this.handleSend = this.handleSend.bind(this);
        this.validForm = this.validForm.bind(this);
        this.getControl = this.getControl.bind(this);
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
        const { name, value } = event.target;
        const { formData, errors } = this.state;
        formData[name] = value;
        errors[name] = '';
        this.setState({
            formData,
            errors,
        });
    }

    getControl = (field) => {
        const { errors, formData } = this.state;

        const props = {
            required: field.required,
            name: field.id,
            label: field.name,
            onChange: this.onChangeFormField,
            errors,
            value: formData[field.id],
        };

        switch (field.type) {
            case 'multiple':
                return (
                    <Multiple
                        options={field.options}
                        {...props}
                    />
                );
            case 'image':
                return (
                    <Photo {...props} />
                );
            case 'simple':
                return (
                    <Simple {...props} />
                );
            case 'text':
                return (
                    <Input {...props} />
                );
            default:
                return null;
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

    handleSend() {
        if (this.validForm()) {
            alert("ok");
        }
    }

    render() {
        const {
            errors, clients, machines, constructions, form, data,
        } = this.state;
        const { client, machine, construction } = data;

        return (
            <div className="check-in-container">
                <Title text="Datos generales" />

                <div className="check-in-container__section">
                    <Row>
                        <Col md={6}><Select name="client" required label="Cliente" options={clients} placeholder="Seleccione..." onChange={this.onChangeClient} value={client} errors={errors} /></Col>
                        <Col md={6}><Select name="construction" label="Obra" options={constructions} placeholder="Seleccione..." onChange={this.onChange} value={construction} errors={errors} /></Col>
                        <Col md={6}><Select name="machine" label="Código de máquina" options={machines} placeholder="Seleccione..." value={machine} onChange={this.onChangeMachine} errors={errors} /></Col>
                    </Row>
                </div>
                <Row>
                    <Col md={12}>
                        {form.name && <Title text={form.name} />}
                    </Col>
                </Row>

                {form.model_section.map((section) => (
                    <div className="check-in-container__section" key={section.id}>
                        <Row key={section.id}>
                            <Col md={12}>
                                {section.name && <Title text={section.name} />}
                            </Col>

                            {section.model_field.map((field) => (
                                <Col md={6} key={field.id} className="check-in-container__field">
                                    {this.getControl(field)}
                                </Col>
                            ))}

                        </Row>
                    </div>
                ))}
                <Row>
                    <Col md={8} />
                    <Col md={4}>
                        <Button text="Enviar" onClick={this.handleSend} />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default CheckIn;
