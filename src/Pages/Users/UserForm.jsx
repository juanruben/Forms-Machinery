import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';

class UserForms extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <>
                <Row>
                    <Col md={6}><Input label="Nombre" placeholder="Nombre" /></Col>
                    <Col md={6}><Input label="Apellido" placeholder="Apellido" /></Col>
                    <Col md={6}><Input label="Nombre de usuario" placeholder="Nombre de usuario" /></Col>
                    <Col md={6}><Input label="RUT" placeholder="RUT" /></Col>
                    <Col md={6}><Input label="Teléfono" placeholder="Teléfono" /></Col>
                    <Col md={6}><Input label="Email" placeholder="Email" /></Col>
                    <Col md={12}><Input label="Rol" placeholder="Rol" /></Col>
                    <Col md={6}><Input label="Contraseña" placeholder="Contraseña" /></Col>
                    <Col md={6}><Input label="Repita contraseña" placeholder="Repita contraseña" /></Col>
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

export default UserForms;
