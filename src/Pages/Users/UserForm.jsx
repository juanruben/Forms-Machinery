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
        const { locked } = this.props;
        const { data, createMode } = this.state;

        return (
            <>
                <Row>
                    <Col md={6}><Input name="name" value={data.name} onChange={() => { }} locked={locked} label="Nombre" placeholder="Nombre" /></Col>
                    <Col md={6}><Input name="name" value={data.name} onChange={() => { }} locked={locked} label="Apellido" placeholder="Apellido" /></Col>
                    <Col md={6}><Input name="name" value={data.name} onChange={() => { }} locked={locked} label="Nombre de usuario" placeholder="Nombre de usuario" /></Col>
                    <Col md={6}><Input name="name" value={data.rut} onChange={() => { }} locked={locked} label="RUT" placeholder="RUT" /></Col>
                    <Col md={6}><Input name="name" value={data.phone} onChange={() => { }} locked={locked} label="Teléfono" placeholder="Teléfono" /></Col>
                    <Col md={6}><Input name="name" value={data.email} onChange={() => { }} locked={locked} label="Email" placeholder="Email" /></Col>
                    <Col md={12}>
                        Rol
                        <select name="" id="" className="select-icafal" defaultValue="0">
                            <option value="0" disabled>Seleccione...</option>
                            <option value="1">Administrador</option>
                            <option value="2">Operador</option>
                        </select>
                    </Col>
                    <Col md={6}><Input name="name" onChange={() => { }} locked={locked} hideLocked label="Contraseña" placeholder="Contraseña" /></Col>
                    <Col md={6}><Input name="name" onChange={() => { }} locked={locked} hideLocked label="Repita contraseña" placeholder="Repita contraseña" /></Col>
                </Row>
                {!locked && (
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
    locked: PropTypes.bool,
};

UserForm.defaultProps = {
    callback: null,
    data: null,
    locked: false,
};

export default UserForm;
