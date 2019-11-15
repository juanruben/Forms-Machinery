import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { StateContext } from '../../State';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';

class ClientForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createMode: true,
        };
        this.handleNew = this.handleNew.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        const { data } = this.props;
        if (data) {
            this.setState({
                ...data,
                createMode: false,
            });
        }
    }

    onChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
            errors: {},
        });
    }

    async handleNew() {
        this.toggleLoading(true);
        const { callback } = this.props;
        setTimeout(() => {
            this.toggleLoading(false);
            callback();
        }, 500);
    }

    async handleUpdate() {
        this.toggleLoading(true);
        const { callback } = this.props;
        setTimeout(() => {
            this.toggleLoading(false);
            callback();
        }, 500);
    }

    toggleLoading(value) {
        const [, dispatch] = this.context;
        dispatch({
            type: 'SET_LOADING',
            value,
        });
    }


    render() {
        const { readOnly } = this.props;
        const { createMode, name, company, rut, contact, phone, email, address } = this.state;

        return (
            <>
                <Row>
                    <Col md={6}><Input name="name" onChange={this.onChange} label="Nombre empresa" placeholder="Nombre empresa" value={name} readOnly={readOnly} icon="fas fa-industry" /></Col>
                    <Col md={6}><Input name="company" onChange={this.onChange} label="Razón social" placeholder="Razón social" value={company} readOnly={readOnly} /></Col>
                    <Col md={6}><Input name="rut" onChange={this.onChange} label="Rut empresa" placeholder="Rut empresa" value={rut} readOnly={readOnly} icon="far fa-address-card" /></Col>
                    <Col md={6}><Input name="contact" onChange={this.onChange} label="Contacto" placeholder="Persona contacto" value={contact} readOnly={readOnly} icon="fas fa-user-tie" /></Col>
                    <Col md={6}><Input name="phone" onChange={this.onChange} label="Teléfono de contacto" placeholder="Teléfono de contacto" value={phone} readOnly={readOnly} icon="fas fa-phone" /></Col>
                    <Col md={6}><Input name="address" onChange={this.onChange} label="Dirección" placeholder="Dirección" value={address} readOnly={readOnly} icon="fas fa-map-marked-alt" /></Col>
                    <Col md={12}><Input name="email" onChange={this.onChange} label="Emails" placeholder="correo1@ejemplo.com, correo2@ejemplo.com, ..." value={email} readOnly={readOnly} icon="far fa-envelope" /></Col>
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

ClientForm.contextType = StateContext;

export default ClientForm;
