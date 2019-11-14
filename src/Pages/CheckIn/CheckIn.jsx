import React from 'react';
import { Row, Col } from 'reactstrap';
import Title from '../../Components/Title/Title';
import Button from '../../Components/Button/Button';
import './CheckIn.scss';

function CheckIn() {
    return (
        <div className="check-in-container">
            <Title text="Datos generales" />
            <div className="check-in-container__section">
                <Row>
                    <Col md={6}>
                        Cliente
                        <select name="" id="" className="select-icafal" defaultValue="0">
                            <option value="0" disabled>Seleccione...</option>
                            <option value="1">Cliente 1</option>
                            <option value="2">Cliente 2</option>
                            <option value="3">Cliente 3</option>
                            <option value="4">Cliente 4</option>
                        </select>
                    </Col>
                    <Col md={6}>
                        Obra
                        <select name="" id="" className="select-icafal" defaultValue="0">
                            <option value="0" disabled>Seleccione...</option>
                            <option value="1">Obra 1</option>
                            <option value="2">Obra 2</option>
                            <option value="3">Obra 3</option>
                            <option value="4">Obra 4</option>
                        </select>
                    </Col>
                    <Col md={6}>
                        Código de máquina
                        <select name="" id="" className="select-icafal" defaultValue="0">
                            <option value="0" disabled>Seleccione...</option>
                            <option value="1">Código de máquina 1</option>
                            <option value="2">Código de máquina 2</option>
                            <option value="3">Código de máquina 3</option>
                            <option value="4">Código de máquina 4</option>
                        </select>
                    </Col>
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

export default CheckIn;
