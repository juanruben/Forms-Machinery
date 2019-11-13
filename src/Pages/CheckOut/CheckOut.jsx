import React from 'react';
import { Row, Col } from 'reactstrap';
import Title from '../../Components/Title/Title';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import './CheckOut.scss';

function CheckOut() {
    return (
        <div className="check-in-container">
            <Title text="Datos generales" />
            <div className="check-in-container__section">
                <Row>
                    <Col md={6}><Input label="Cliente" placeholder="Seleccione..." /></Col>
                    <Col md={6}><Input label="Obra" placeholder="Seleccione..." /></Col>
                    <Col md={6}><Input label="Máquina" placeholder="Seleccione..." /></Col>
                    <Col md={6}><Input label="Código" placeholder="Seleccione..." /></Col>
                </Row>
            </div>
            <Row>
                <Col md={8} />
                <Col md={4}>
                    <Button text="Enviar" />
                </Col>
            </Row>
        </div>
    );
}

export default CheckOut;
