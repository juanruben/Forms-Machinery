/* eslint-disable camelcase */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Spinner } from 'reactstrap';
import { StateContext } from '../../State';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import { validateRut, validateEmail } from '../../Service/Utils';
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
            errors.contact = 'Requerido';
        }

        if (!phone || contact.trim().length === 0) {
            formIsValid = false;
            errors.phone = 'Requerido';
        }

        if (email && !validateEmail(email)) {
            formIsValid = false;
            errors.email = 'Email inválido';
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
            name, business_name, rut, contact, phone, email, address,
        } = data;


        return (
            <>
                <Row>
                    <Col md={6}><Input name="name" onChange={this.onChange} label="Nombre empresa" placeholder="Nombre empresa" value={name} readOnly={readOnly || !createMode} icon="fas fa-industry" errors={errors} required /></Col>
                    <Col md={6}><Input name="business_name" onChange={this.onChange} label="Razón social" placeholder="Razón social" value={business_name} readOnly={readOnly || !createMode} errors={errors} required /></Col>
                    <Col md={6}><Input name="rut" onChange={this.onChange} label="Rut empresa" placeholder="Ej: 11111111-1" value={rut} readOnly={readOnly || !createMode} icon="far fa-address-card" errors={errors} required /></Col>
                    <Col md={6}><Input name="contact" onChange={this.onChange} label="Contacto" placeholder="Persona contacto" value={contact} readOnly={readOnly} icon="fas fa-user-tie" errors={errors} required /></Col>
                    <Col md={6}><Input name="phone" onChange={this.onChange} label="Teléfono de contacto" placeholder="Teléfono de contacto" value={phone} readOnly={readOnly} icon="fas fa-phone" errors={errors} required /></Col>
                    <Col md={6}><Input name="address" onChange={this.onChange} label="Dirección" placeholder="Dirección" value={address} readOnly={readOnly} icon="fas fa-map-marked-alt" errors={errors} required /></Col>
                    <Col md={12}><Input name="email" onChange={this.onChange} label="Email" placeholder="correo1@ejemplo.com" value={email} readOnly={readOnly} icon="far fa-envelope" errors={errors} required /></Col>
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
