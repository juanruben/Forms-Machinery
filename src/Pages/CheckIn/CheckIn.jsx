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
        this.onChangeClient = this.onChangeClient.bind(this);
        this.onChangeMachine = this.onChangeMachine.bind(this);
        this.handleSend = this.handleSend.bind(this);
        this.validForm = this.validForm.bind(this);
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
                    <div className="check-in-container__section">
                        <Row key={section.id}>
                            <Col md={12}>
                                {section.name && <Title text={section.name} />}
                            </Col>

                            {section.model_field.map((field) => {
                                switch (field.type) {
                                    case 'multiple':
                                        return (
                                            <Col md={6} key={field.id} className="check-in-container__field"><Multiple required label={field.name} options={field.options} name={field.name} onChange={() => { }} errors={errors} /></Col>
                                        );
                                    case 'image':
                                        return (
                                            <Col md={6} key={field.id} className="check-in-container__field"><Photo label={field.name} name="name3" onChange={() => { }} /></Col>
                                        );
                                    case 'simple':
                                        return (
                                            <Col md={6} key={field.id} className="check-in-container__field"><Simple label={field.name} name="name" onChange={() => { }} /></Col>
                                        );
                                    case 'text':
                                        return (
                                            <Col md={6} key={field.id} className="check-in-container__field"><Input label={field.name} name="name" placeholder={field.name} onChange={() => { }} /></Col>
                                        );
                                    default:
                                        return null;
                                }
                            })}

                        </Row>
                    </div>
                ))}

                {/* <Row>
                        <Col md={6}><Simple label="Esto es un ejemplo de selección simple" name="name" onChange={() => { }} /></Col>
                        <Col md={6}><Multiple required label="Esto es un ejemplo de múltiples opciones" options={options} name="test" onChange={() => { }} errors={errors} /></Col>
                        <Col md={6}><Multiple label="Otro ejemplo de múltiples opciones" options={options2} name="name2" onChange={() => { }} /></Col>
                        <Col md={6}><Multiple label="Y otro más" options={options3} name="name3" onChange={() => { }} /></Col>
                        <Col md={4}><Photo required label="Toma una foto de XYZ en la máquina" onChange={() => { }} name="photo1" errors={errors} /></Col>
                        <Col md={4}><Photo label="Toma otra foto de la máquina" name="name2" onChange={() => { }} /></Col>
                        <Col md={4}><Photo label="Y otra foto más" name="name3" onChange={() => { }} /></Col>
                    </Row> */}

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
