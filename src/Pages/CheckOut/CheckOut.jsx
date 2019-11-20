import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Title from '../../Components/Title/Title';
import Input from '../../Components/Input/Input';
import Select from '../../Components/Select/Select';
import Button from '../../Components/Button/Button';
import './CheckOut.scss';

const clients = [
    {
        id: 1,
        name: 'Cliente 1',
    },
    {
        id: 2,
        name: 'Cliente 2',
    },
    {
        id: 3,
        name: 'Cliente 3',
    },
];

const constructions = [
    {
        id: 1,
        name: 'Obra 1',
    },
    {
        id: 2,
        name: 'Obra 2',
    },
    {
        id: 3,
        name: 'Obra 3',
    },
];

const machines = [
    {
        id: 1,
        name: 'Máquina 1',
    },
    {
        id: 2,
        name: 'Máquina 2',
    },
    {
        id: 3,
        name: 'Máquina 3',
    },
];

const form = {
    id: 1,
    name: 'Nombre del Formulario',
    model_section: [
        {
            id: 1,
            name: 'Section 1 Form 1',
            order: 1,
            model_form_id: 1,
            model_field: [
                {
                    id: 3,
                    name: 'Field 1 Section 1 Form 1',
                    order: 1,
                    type: 'text',
                    required: true,
                    comments: false,
                    options: null,
                },
            ],
        },
    ],
};

class CheckOut extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
        };
    }

    render() {
        const { errors } = this.state;

        return (
            <div className="check-in-container">
                <Title text="Datos generales" />
                <div className="check-in-container__section">
                    <Row>
                        <Col md={6}><Select label="Cliente" options={clients} placeholder="Seleccione..." name="client" onChange={() => { }} errors={errors} /></Col>
                        <Col md={6}><Select label="Obra" options={constructions} placeholder="Seleccione..." name="construction" onChange={() => { }} errors={errors} /></Col>
                        <Col md={6}><Select label="Código de máquina" options={machines} placeholder="Seleccione..." name="code" onChange={() => { }} errors={errors} /></Col>
                    </Row>
                </div>

                <Title text={form.name} />

                {form.model_section.map((section) => (
                    <div key={section.id}>
                        <Title text={section.name} />
                        <div className="check-in-container__section">
                            <Row>
                                {section.model_field.map((field) => (
                                    <Col md={6} key={field.id}><Input label={`${field.name} ${field.required ? '*' : ''}`} name="test" onChange={() => { }} errors={errors.test} /></Col>
                                ))}
                            </Row>
                        </div>
                    </div>
                ))}

                <Row>
                    <Col md={8} />
                    <Col md={4}>
                        <Button text="Enviar" onClick={() => { }} />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default CheckOut;
