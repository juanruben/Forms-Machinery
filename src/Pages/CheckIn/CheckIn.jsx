import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Title from '../../Components/Title/Title';
import Select from '../../Components/Select/Select';
import Button from '../../Components/Button/Button';
import Simple from '../../Components/Simple/Simple';
import Multiple from '../../Components/Multiple/Multiple';
import Photo from '../../Components/Photo/Photo';
import './CheckIn.scss';

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

const options = [
    {
        id: 1,
        name: '50%',
    },
    {
        id: 2,
        name: '75%',
    },
    {
        id: 3,
        name: '100%',
    },
];

const options2 = [
    {
        id: 4,
        name: 'Bueno',
    },
    {
        id: 5,
        name: 'Regular',
    },
    {
        id: 6,
        name: 'Malo',
    },
];

const options3 = [
    {
        id: 7,
        name: 'Bajo',
    },
    {
        id: 8,
        name: 'Medio',
    },
    {
        id: 9,
        name: 'Alto',
    },
];

class CheckIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {
                client: 'Requerido',
                test: 'Requerido',
                photo1: 'Requerido',
            },
        };
    }

    render() {
        const { errors } = this.state;

        // TODO. Pasar todo array de errors

        return (
            <div className="check-in-container">
                <Title text="Datos generales" />
                <div className="check-in-container__section">
                    <Row>
                        <Col md={6}><Select required label="Cliente" options={clients} placeholder="Seleccione..." name="name" onChange={() => { }} errors={errors.client} /></Col>
                        <Col md={6}><Select label="Obra" options={constructions} placeholder="Seleccione..." name="name" onChange={() => { }} /></Col>
                        <Col md={6}><Select label="Código de máquina" options={machines} placeholder="Seleccione..." name="name" onChange={() => { }} /></Col>
                        <Col md={6}><Simple label="Esto es un ejemplo de selección simple" name="name" onChange={() => { }} /></Col>
                        <Col md={6}><Multiple required label="Esto es un ejemplo de múltiples opciones" options={options} name="test" onChange={() => { }} errors={errors.test} /></Col>
                        <Col md={6}><Multiple label="Otro ejemplo de múltiples opciones" options={options2} name="name2" onChange={() => { }} /></Col>
                        <Col md={6}><Multiple label="Y otro más" options={options3} name="name3" onChange={() => { }} /></Col>
                    </Row>
                    <Row>
                        <Col md={4}><Photo required label="Toma una foto de XYZ en la máquina" onChange={() => { }} name="photo1" errors={errors.photo1} /></Col>
                        <Col md={4}><Photo label="Toma otra foto de la máquina" onChange={() => { }} /></Col>
                        <Col md={4}><Photo label="Y otra foto más" onChange={() => { }} /></Col>
                    </Row>
                </div>
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

export default CheckIn;
