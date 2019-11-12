import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';

class MachineForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <>
                <Row>
                    <Col md={12}><Input label="Nombre" placeholder="Nombre" /></Col>
                    <Col md={6}><Input label="Código" placeholder="Código" /></Col>
                    <Col md={6}><Input label="Patente" placeholder="Patente" /></Col>
                    <Col md={6}><Input label="Marca" placeholder="Marca" /></Col>
                    <Col md={6}><Input label="Modelo" placeholder="Modelo" /></Col>
                    <Col md={6}><Input label="Año" placeholder="Año" /></Col>
                    <Col md={6}><Input label="Formulario" placeholder="Seleccione..." /></Col>
                </Row>
                <Row>
                    <Col md={8} />
                    <Col md={4}>
                        <Button text="Crear" />
                    </Col>
                </Row>
            </>
        );
    }
}

export default MachineForm;
