import React from 'react';
import { Row, Col } from 'reactstrap';
import Title from '../../Components/Title/Title';
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

function CheckOut() {
    return (
        <div className="check-in-container">
            <Title text="Datos generales" />
            <div className="check-in-container__section">
                <Row>
                    <Col md={6}><Select label="Cliente" options={clients} placeholder="Seleccione..." name="name" onChange={() => { }} /></Col>
                    <Col md={6}><Select label="Obra" options={constructions} placeholder="Seleccione..." name="name" onChange={() => { }} /></Col>
                    <Col md={6}><Select label="Código de máquina" options={machines} placeholder="Seleccione..." name="name" onChange={() => { }} /></Col>
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

export default CheckOut;
