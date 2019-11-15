import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';

class ClientForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            createMode: true,
        };
        this.handleNew = this.handleNew.bind(this);
    }

    componentDidMount() {
        const { data } = this.props;
        if (data) {
            this.setState({
                data,
                createMode: false,
            });
        }
    }

    async handleNew() {
        const { callback } = this.props;
        callback();
    }

    async handleUpdate() {
        const { callback } = this.props;
        callback();
    }

    render() {
        const { readOnly } = this.props;
        const { data, createMode } = this.state;

        return (
            <>
                <Row>
                    <Col md={6}><Input icon="far fa-envelope" name="name" onChange={() => { }} label="Nombre empresa" placeholder="Nombre empresa" value={data.name} readOnly={readOnly} /></Col>
                    <Col md={6}><Input name="name" onChange={() => { }} label="Razón social" placeholder="Razón social" value={data.name} readOnly={readOnly} /></Col>
                    <Col md={6}><Input name="name" onChange={() => { }} label="Rut empresa" placeholder="Rut empresa" value={data.rut} readOnly={readOnly} /></Col>
                    <Col md={6}><Input name="name" onChange={() => { }} label="Teléfono de contacto" placeholder="Teléfono de contacto" value={data.phone} readOnly={readOnly} /></Col>
                    <Col md={12}><Input name="name" onChange={() => { }} label="Dirección" placeholder="Dirección" value={data.address} readOnly={readOnly} /></Col>
                    <Col md={12}><Input name="name" onChange={() => { }} label="Emails" placeholder="correo1@ejemplo.com, correo2@ejemplo.com, ..." value={data.email} readOnly={readOnly} /></Col>
                </Row>
                {!readOnly && (
                    <>
                        * Estas direcciones de correo recibirán reporte y estado de las maquinarias
                        cuando esta salgan del taller hacia la obra del cliente
                        <Row>
                            <Col md={8} />
                            <Col md={4}>
                                <Button text={createMode ? 'Crear' : 'Actualizar'} onClick={this.handleNew} />
                            </Col>
                        </Row>
                    </>
                )}
            </>
        );
    }
}

ClientForm.propTypes = {
    callback: PropTypes.func,
    data: PropTypes.object,
    readOnly: PropTypes.bool,
};

ClientForm.defaultProps = {
    callback: null,
    data: null,
    readOnly: false,
};

export default ClientForm;
