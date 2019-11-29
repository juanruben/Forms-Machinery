/* eslint-disable camelcase */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Spinner } from 'reactstrap';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import Select from '../../Components/Select/Select';
import { addUser, updateUser } from '../../Service/Api';
import {
    validateUsername, validateRut, validatePassword, validateEmail,
    formatRut, unformatRut, formatPhone, unformatPhone,
} from '../../Service/Utils';

const profiles = [
    {
        id: 1,
        name: 'Administrador',
    },
    {
        id: 2,
        name: 'Operador',
    },
];

class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createMode: true,
            data: {},
            errors: {},
            loading: false,
        };
        this.handleCreate = this.handleCreate.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.onChange = this.onChange.bind(this);
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
        data.phone = formatPhone(data.phone);
        this.setState({
            data,
        });
    }

    onFocusPhone() {
        const { data } = this.state;
        data.phone = unformatPhone(data.phone);
        this.setState({
            data,
        });
    }

    validForm() {
        const { data, createMode } = this.state;
        const {
            name, last_name, username, rut, password, repeatPassword, phone, email, role_id,
        } = data;
        const errors = {};
        let formIsValid = true;

        if (!name || name.trim().length === 0) {
            formIsValid = false;
            errors.name = ['Requerido'];
        }

        if (!last_name || last_name.trim().length === 0) {
            formIsValid = false;
            errors.last_name = ['Requerido'];
        }

        if (!rut || unformatRut(rut).trim().length === 0) {
            formIsValid = false;
            errors.rut = ['Requerido'];
        } else if (!validateRut(rut)) {
            formIsValid = false;
            errors.rut = ['Rut inválido'];
        }

        if (!username || username.trim().length === 0) {
            formIsValid = false;
            errors.username = ['Requerido'];
        } else if (username.trim().length < 6) {
            formIsValid = false;
            errors.username = ['Deben ser al menos 6 caracteres'];
        } else if (!validateUsername(username)) {
            formIsValid = false;
            errors.username = ['Error de formato. Solo minúsculas'];
        }

        if (!phone || phone.trim().length === 0) {
            formIsValid = false;
            errors.phone = ['Requerido'];
        } else if (unformatPhone(phone).length !== 11) {
            formIsValid = false;
            errors.phone = ['Deben ser 11 dígitos'];
        }

        if (!email || email.trim().length === 0) {
            formIsValid = false;
            errors.email = ['Requerido'];
        } else if (!validateEmail(email)) {
            formIsValid = false;
            errors.email = 'Error de formato de email';
        }

        if (!role_id || role_id === 0) {
            formIsValid = false;
            errors.role_id = ['Requerido'];
        }

        if (createMode) {
            if (!password || password.trim().length === 0) {
                formIsValid = false;
                errors.password = ['Requerido'];
            } else if (!validatePassword(password)) {
                formIsValid = false;
                errors.password = ['Al menos: 1 mayúsc, 1 minúsc, 1 número'];
            }

            if (!repeatPassword || repeatPassword.trim().length === 0) {
                formIsValid = false;
                errors.repeatPassword = ['Requerido'];
            } else if (repeatPassword !== password) {
                formIsValid = false;
                errors.repeatPassword = ['Debe coincidir'];
            }
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
            data.phone = unformatPhone(data.phone);
            data.rut = unformatRut(data.rut);
            await addUser(data).then((response) => {
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
            data.phone = unformatPhone(data.phone);
            data.rut = unformatRut(data.rut);
            await updateUser(data).then((response) => {
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
            name, last_name, username, rut, phone, email, role_id, password, repeatPassword,
        } = data;

        return (
            <>
                <Row>
                    <Col md={6}><Input name="name" value={name} onChange={this.onChange} readOnly={readOnly} label="Nombre" placeholder="Nombre" icon="fas fa-user-alt" errors={errors} required /></Col>
                    <Col md={6}><Input name="last_name" value={last_name} onChange={this.onChange} readOnly={readOnly} label="Apellido" placeholder="Apellido" icon="fas fa-user-alt" errors={errors} required /></Col>
                    <Col md={6}><Input name="username" value={username} onChange={this.onChange} readOnly={readOnly} label="Nombre de usuario" placeholder="Nombre de usuario" icon="fas fa-user-alt" errors={errors} required /></Col>
                    <Col md={6}><Input name="rut" value={rut} onChange={this.onChange} readOnly={readOnly} label="RUT" placeholder="RUT" icon="far fa-address-card" errors={errors} required onBlur={this.onBlurRut} onFocus={this.onFocusRut} /></Col>
                    <Col md={6}><Input name="phone" value={phone} onChange={this.onChange} readOnly={readOnly} label="Teléfono" placeholder="Teléfono" icon="fas fa-phone" errors={errors} required onBlur={this.onBlurPhone} onFocus={this.onFocusPhone} /></Col>
                    <Col md={6}><Input name="email" value={email} onChange={this.onChange} readOnly={readOnly} label="Email" placeholder="Email" icon="far fa-envelope" errors={errors} required /></Col>
                    <Col md={12}><Select label="Rol" value={role_id} options={profiles} placeholder="Seleccione..." name="role_id" onChange={this.onChange} readOnly={readOnly} errors={errors} required /></Col>
                    {createMode && (
                        <>
                            <Col md={6}><Input name="password" type="password" value={password} onChange={this.onChange} readOnly={readOnly} hideReadOnly label="Contraseña" placeholder="Contraseña" errors={errors} required /></Col>
                            <Col md={6}><Input name="repeatPassword" type="password" value={repeatPassword} onChange={this.onChange} readOnly={readOnly} hideReadOnly label="Repita contraseña" placeholder="Repita contraseña" errors={errors} required /></Col>
                        </>
                    )}
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

UserForm.propTypes = {
    callback: PropTypes.func,
    data: PropTypes.object,
    readOnly: PropTypes.bool,
};

UserForm.defaultProps = {
    callback: null,
    data: null,
    readOnly: false,
};

export default UserForm;
