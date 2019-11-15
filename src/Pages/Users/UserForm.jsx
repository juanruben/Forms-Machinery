import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';

class UserForm extends Component {
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
                    <Col md={6}><Input name="name" value={data.name} onChange={() => { }} readOnly={readOnly} label="Nombre" placeholder="Nombre" icon="fas fa-user-alt" /></Col>
                    <Col md={6}><Input name="name" value={data.name} onChange={() => { }} readOnly={readOnly} label="Apellido" placeholder="Apellido" icon="fas fa-user-alt" /></Col>
                    <Col md={6}><Input name="name" value={data.name} onChange={() => { }} readOnly={readOnly} label="Nombre de usuario" placeholder="Nombre de usuario" icon="fas fa-user-alt" /></Col>
                    <Col md={6}><Input name="name" value={data.rut} onChange={() => { }} readOnly={readOnly} label="RUT" placeholder="RUT" icon="far fa-address-card" /></Col>
                    <Col md={6}><Input name="name" value={data.phone} onChange={() => { }} readOnly={readOnly} label="Teléfono" placeholder="Teléfono" icon="fas fa-phone" /></Col>
                    <Col md={6}><Input name="name" value={data.email} onChange={() => { }} readOnly={readOnly} label="Email" placeholder="Email" icon="far fa-envelope" /></Col>
                    <Col md={12}>
                        Rol
                        <select name="" id="" className="select-icafal" defaultValue="0">
                            <option value="0" disabled>Seleccione...</option>
                            <option value="1">Administrador</option>
                            <option value="2">Operador</option>
                        </select>
                    </Col>
                    <Col md={6}><Input name="name" onChange={() => { }} readOnly={readOnly} hideReadOnly label="Contraseña" placeholder="Contraseña" /></Col>
                    <Col md={6}><Input name="name" onChange={() => { }} readOnly={readOnly} hideReadOnly label="Repita contraseña" placeholder="Repita contraseña" /></Col>
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

export default UserForm;
