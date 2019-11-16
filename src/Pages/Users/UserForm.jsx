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
        };
        this.handleNew = this.handleNew.bind(this);
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
        const { createMode, name, company, model, rut, email, profile, phone, password, repeatPassword } = this.state;

        return (
            <>
                <Row>
                    <Col md={6}><Input name="name" value={name} onChange={() => { }} readOnly={readOnly} label="Nombre" placeholder="Nombre" icon="fas fa-user-alt" /></Col>
                    <Col md={6}><Input name="company" value={company} onChange={() => { }} readOnly={readOnly} label="Apellido" placeholder="Apellido" icon="fas fa-user-alt" /></Col>
                    <Col md={6}><Input name="model" value={model} onChange={() => { }} readOnly={readOnly} label="Nombre de usuario" placeholder="Nombre de usuario" icon="fas fa-user-alt" /></Col>
                    <Col md={6}><Input name="rut" value={rut} onChange={() => { }} readOnly={readOnly} label="RUT" placeholder="RUT" icon="far fa-address-card" /></Col>
                    <Col md={6}><Input name="phone" value={phone} onChange={() => { }} readOnly={readOnly} label="Teléfono" placeholder="Teléfono" icon="fas fa-phone" /></Col>
                    <Col md={6}><Input name="email" value={email} onChange={() => { }} readOnly={readOnly} label="Email" placeholder="Email" icon="far fa-envelope" /></Col>
                    <Col md={12}><Select label="Rol" value={profile} options={profiles} placeholder="Seleccione..." name="name" onChange={() => { }} readOnly={readOnly} /></Col>
                    <Col md={6}><Input name="password" value={password} onChange={() => { }} readOnly={readOnly} hideReadOnly label="Contraseña" placeholder="Contraseña" /></Col>
                    <Col md={6}><Input name="repeatPassword" value={repeatPassword} onChange={() => { }} readOnly={readOnly} hideReadOnly label="Repita contraseña" placeholder="Repita contraseña" /></Col>
                </Row>
                {!readOnly && (
                    <Row>
                        <Col md={8} />
                        <Col md={4}>
                            <Button text={createMode ? 'Crear' : 'Actualizar'} onClick={this.handleNew} />
                        </Col>
                    </Row>
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
