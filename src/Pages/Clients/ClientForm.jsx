/* eslint-disable camelcase */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Spinner } from 'reactstrap';
import { StateContext } from '../../State';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import {
    validateRut, validateEmail, formatRut, unformatRut,
    formatPhone, unformatPhone,
} from '../../Service/Utils';
import { addClient, updateClient } from '../../Service/Api';

class ClientForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createMode: true,
            data: {},
            errors: {},
        };
        this.handleCreate = this.handleCreate.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.onChange = this.onChange.bind(this);
        this.validForm = this.validForm.bind(this);
        this.onBlurRut = this.onBlurRut.bind(this);
        this.onFocusRut = this.onFocusRut.bind(this);
        this.onBlurPhone = this.onBlurPhone.bind(this);
        this.onFocusPhone = this.onFocusPhone.bind(this);
    }

    componentDidMount() {
        const { data } = this.props;
        if (data) {
            data.phone = formatPhone(data.phone);
            data.rut = formatRut(data.rut);
            this.setState({
                data,
                createMode: false,
            });
        }
    }

    onBlurRut() {
        const { data } = this.state;
        data.rut = formatRut(data.rut);
        this.setState({
            data,
        });
    }

    onFocusRut() {
        const { data } = this.state;
        data.rut = unformatRut(data.rut);
        this.setState({
            data,
        });
    }

    onBlurPhone() {
        const { data } = this.state;
        data.contact = formatPhone(data.contact);
        this.setState({
            data,
        });
    }

    onFocusPhone() {
        const { data } = this.state;
        data.contact = unformatPhone(data.contact);
        this.setState({
            data,
        });
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
            name, business_name, rut, contact, email, address,
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

        if (rut && !validateRut(rut)) {
            formIsValid = false;
            errors.rut = 'Rut inválido';
        }

        if (!rut || rut.trim().length === 0) {
            formIsValid = false;
            errors.rut = 'Requerido';
        }

        if (!contact || contact.trim().length === 0) {
            formIsValid = false;
            errors.contact = ['Requerido'];
        } else if (unformatPhone(contact).length !== 11) {
            formIsValid = false;
            errors.contact = ['Deben ser 11 dígitos'];
        }

        if (email && !validateEmail(email)) {
            formIsValid = false;
            errors.email = 'Email inválido';
        }

        if (!email || email.trim().length === 0) {
            formIsValid = false;
            errors.email = ['Requerido'];
        } else if (!validateEmail(email)) {
            formIsValid = false;
            errors.email = 'Error de formato de email';
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

    async handleCreate() {
        if (this.validForm()) {
            this.toggleLoading(true);
            const { data } = this.state;

            await addClient(data).then((response) => {
                if (response && response.status === 201) {
                    const { callback } = this.props;
                    callback();
                }
            }).catch((error) => {
                this.setState({
                    errors: error.response.data.errors,
                });
            });

            this.toggleLoading(false);
        }
    }

    async handleUpdate() {
        if (this.validForm()) {
            this.toggleLoading(true);
            const { data } = this.state;

            await updateClient(data).then((response) => {
                if (response && response.status === 200) {
                    const { callback } = this.props;
                    callback();
                }
            }).catch((error) => {
                this.setState({
                    errors: error.response.data.errors,
                });
            });
            this.toggleLoading(false);
        }
    }

    toggleLoading(value) {
        this.setState({
            loading: value,
        });
    }

    render() {
        const { readOnly } = this.props;
        const {
            createMode, errors, data, loading,
        } = this.state;
        const {
            name, business_name, rut, contact, email, address,
        } = data;

        const rest = {
            onChange: this.onChange,
            errors,
            required: true,
        };

        return (
            <>
                <Row>
                    <Col md={6}><Input name="name" label="Nombre empresa" value={name} readOnly={readOnly || !createMode} icon="fas fa-industry" {...rest} /></Col>
                    <Col md={6}><Input name="business_name" label="Razón social" value={business_name} readOnly={readOnly || !createMode} {...rest} /></Col>
                    <Col md={6}><Input name="rut" label="Rut empresa" placeholder="Ej: 11111111-1" value={rut} readOnly={readOnly || !createMode} icon="far fa-address-card" onBlur={this.onBlurRut} onFocus={this.onFocusRut} {...rest} /></Col>
                    <Col md={6}><Input name="contact" label="Teléfono de contacto" value={contact} readOnly={readOnly} icon="fas fa-phone" required onBlur={this.onBlurPhone} onFocus={this.onFocusPhone} {...rest} /></Col>
                    <Col md={12}><Input name="address" label="Dirección" value={address} readOnly={readOnly} icon="fas fa-map-marked-alt" {...rest} /></Col>
                    <Col md={12}><Input name="email" label="Email" placeholder="correo1@ejemplo.com" value={email} readOnly={readOnly} icon="far fa-envelope" {...rest} /></Col>
                </Row>
                {!readOnly && (
                    <div className="form-footer">
                        {loading && <div className="spinner"><Spinner /></div>}
                        <Button text={createMode ? 'Crear' : 'Actualizar'} onClick={createMode ? this.handleCreate : this.handleUpdate} />
                    </div>
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
