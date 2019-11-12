import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';

class ClientForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { callback } = this.props;
        return (
            <>
                <Row>
                    <Col md={6}><Input label="Nombre empresa" placeholder="Nombre empresa" /></Col>
                    <Col md={6}><Input label="Razón social" placeholder="Razón social" /></Col>
                    <Col md={6}><Input label="Rut empresa" placeholder="Rut empresa" /></Col>
                    <Col md={6}><Input label="Teléfono de contacto" placeholder="Teléfono de contacto" /></Col>
                    <Col md={12}><Input label="Dirección" placeholder="Dirección" /></Col>
                    <Col md={12}><Input label="Emails" placeholder="correo1@ejemplo.com, correo2@ejemplo.com, ..." /></Col>
                </Row>
                * Estas direcciones de correo recibirán reporte y estado de las maquinarias cuando esta salgan del taller hacia la obra del cliente
                <Row>
                    <Col md={8} />
                    <Col md={4}>
                        <Button text="Crear" onClick={callback} />
                    </Col>
                </Row>
            </>
        );
    }
}

ClientForm.propTypes = {
    callback: PropTypes.func,
};

ClientForm.defaultProps = {
    callback: null,
};

export default ClientForm;
