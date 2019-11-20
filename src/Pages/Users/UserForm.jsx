import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { StateContext } from '../../State';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import Select from '../../Components/Select/Select';

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
        };
        this.handleNew = this.handleNew.bind(this);
        this.onChange = this.onChange.bind(this);
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

        if (!rut || rut.trim().length === 0) {
            formIsValid = false;
            errors.rut = ['Requerido'];
        }

        if (!username || username.trim().length === 0) {
            formIsValid = false;
            errors.username = ['Requerido'];
        } else if (phone.trim().length < 6) {
            formIsValid = false;
            errors.phone = ['Deben ser al menos 6 caracteres'];
        }

        if (!phone || phone.trim().length === 0) {
            formIsValid = false;
            errors.phone = ['Requerido'];
        } else if (phone.trim().length !== 11) {
            formIsValid = false;
            errors.phone = ['Deben ser 11 dígitos'];
        }

        if (!email || email.trim().length === 0) {
            formIsValid = false;
            errors.email = ['Requerido'];
        }

        if (!role_id || role_id === 0) {
            formIsValid = false;
            errors.role_id = ['Requerido'];
        }

        if (createMode) {
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
        const { createMode, errors, data } = this.state;
        const {
            name, last_name, username, rut, phone, email, role_id, password, repeatPassword,
        } = data;

        return (
            <>
                <Row>
                    <Col md={6}><Input name="name" value={name} onChange={this.onChange} readOnly={readOnly} label="Nombre" placeholder="Nombre" icon="fas fa-user-alt" errors={errors} required /></Col>
                    <Col md={6}><Input name="last_name" value={last_name} onChange={this.onChange} readOnly={readOnly} label="Apellido" placeholder="Apellido" icon="fas fa-user-alt" errors={errors} required /></Col>
                    <Col md={6}><Input name="username" value={username} onChange={this.onChange} readOnly={readOnly} label="Nombre de usuario" placeholder="Nombre de usuario" icon="fas fa-user-alt" errors={errors} required /></Col>
                    <Col md={6}><Input name="rut" value={rut} onChange={this.onChange} readOnly={readOnly} label="RUT" placeholder="RUT" icon="far fa-address-card" errors={errors} required /></Col>
                    <Col md={6}><Input name="phone" value={phone} onChange={this.onChange} readOnly={readOnly} label="Teléfono" placeholder="Teléfono" icon="fas fa-phone" errors={errors} required /></Col>
                    <Col md={6}><Input name="email" value={email} onChange={this.onChange} readOnly={readOnly} label="Email" placeholder="Email" icon="far fa-envelope" errors={errors} required /></Col>
                    <Col md={12}><Select label="Rol" value={String(role_id)} options={profiles} placeholder="Seleccione..." name="role_id" onChange={this.onChange} readOnly={readOnly} errors={errors} required /></Col>
                    {createMode &&
                        <>
                    <Col md={6}><Input name="password" type="password" value={password} onChange={this.onChange} readOnly={readOnly} hideReadOnly label="Contraseña" placeholder="Contraseña" errors={errors} required /></Col>
                    <Col md={6}><Input name="repeatPassword" type="password" value={repeatPassword} onChange={this.onChange} readOnly={readOnly} hideReadOnly label="Repita contraseña" placeholder="Repita contraseña" errors={errors} required /></Col>
                        </>
                    }
                </Row>
                {!readOnly && (
                    <div className="form-footer">
                        {loading && <div className="spinner"><Spinner /></div>}
                        <Button text={createMode ? 'Crear' : 'Actualizar'} onClick={createMode ? this.handleNew : this.handleUpdate} />
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

UserForm.contextType = StateContext;

export default UserForm;
