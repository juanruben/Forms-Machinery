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
            data: {},
            errors: {},
        };
        this.handleNew = this.handleNew.bind(this);
        this.onChange = this.onChange.bind(this);
        this.validForm = this.validForm.bind(this);
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

    onChange(event) {
        const { name, value } = event.target;
        const { data, errors } = this.state;
        data[name] = value;
        errors[name] = '';
        this.setState({
            data,
            errors,
        });
    }

    validForm() {
        const { data } = this.state;
        const {
            name, business_name, rut, contact, phone, email, address,
        } = data;
        const errors = {};
        let formIsValid = true;

        if (!name || name.trim().length === 0) {
            formIsValid = false;
            errors.name = 'Requerido';
        }

        if (!business_name || business_name.trim().length === 0) {
            formIsValid = false;
            errors.business_name = 'Requerido';
        }

        if (!rut || rut.trim().length === 0) {
            formIsValid = false;
            errors.rut = 'Requerido';
        }

        if (!contact || contact.trim().length === 0) {
            formIsValid = false;
            errors.contact = 'Requerido';
        }

        if (!phone || contact.trim().length === 0) {
            formIsValid = false;
            errors.phone = 'Requerido';
        }

        if (!email || email.trim().length === 0) {
            formIsValid = false;
            errors.email = 'Requerido';
        }

        if (!address || address.trim().length === 0) {
            formIsValid = false;
            errors.address = 'Requerido';
        }

        this.setState({
            errors,
        });

        return formIsValid;
    }

    async handleNew() {
        if (this.validForm()) {
            this.toggleLoading(true);
            const { callback } = this.props;

            setTimeout(() => {
                this.toggleLoading(false);
                callback();
            }, 500);
        }
    }

    async handleUpdate() {
        if (this.validForm()) {
            this.toggleLoading(true);
            const { callback } = this.props;

            setTimeout(() => {
                this.toggleLoading(false);
                callback();
            }, 500);
        }
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
        const { createMode, errors, data } = this.state;
        const {
            name, business_name, rut, contact, phone, email, address,
        } = data;


        return (
            <>
                <Row>
                    <Col md={6}><Input name="name" onChange={this.onChange} label="Nombre empresa" placeholder="Nombre empresa" value={name} readOnly={readOnly || !createMode} icon="fas fa-industry" errors={errors} required /></Col>
                    <Col md={6}><Input name="business_name" onChange={this.onChange} label="Razón social" placeholder="Razón social" value={business_name} readOnly={readOnly || !createMode} errors={errors} required /></Col>
                    <Col md={6}><Input name="rut" onChange={this.onChange} label="Rut empresa" placeholder="Rut empresa" value={rut} readOnly={readOnly || !createMode} icon="far fa-address-card" errors={errors} required /></Col>
                    <Col md={6}><Input name="contact" onChange={this.onChange} label="Contacto" placeholder="Persona contacto" value={contact} readOnly={readOnly} icon="fas fa-user-tie" errors={errors} required /></Col>
                    <Col md={6}><Input name="phone" onChange={this.onChange} label="Teléfono de contacto" placeholder="Teléfono de contacto" value={phone} readOnly={readOnly} icon="fas fa-phone" errors={errors} required /></Col>
                    <Col md={6}><Input name="address" onChange={this.onChange} label="Dirección" placeholder="Dirección" value={address} readOnly={readOnly} icon="fas fa-map-marked-alt" errors={errors} required /></Col>
                    <Col md={12}><Input name="email" onChange={this.onChange} label="Emails" placeholder="correo1@ejemplo.com, correo2@ejemplo.com, ..." value={email} readOnly={readOnly} icon="far fa-envelope" errors={errors} required /></Col>
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
