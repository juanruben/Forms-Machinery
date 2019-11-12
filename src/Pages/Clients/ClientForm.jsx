import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';

class ClientForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sent: false,
        }
    }

    render() {
        return (
            <>
                <Input placeholder="Nombre empresa" />
                <Input placeholder="Razón social" />
                <Input placeholder="Rut empresa" />
                <Input placeholder="Teléfono de contacto" />
                <Input placeholder="Dirección" />
                <Input placeholder="Emails" />
                * Estas direcciones de correo recibirán reporte y estado de las maquinarias cuando esta salgan del taller hacia la obra del cliente
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

export default ClientForm;
