import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';

class MachineForm extends Component {
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
                    <Col md={12}><Input label="Nombre" placeholder="Nombre" name="name" onChange={() => { }} value={data.machine} locked={locked} /></Col>
                    <Col md={6}><Input label="Código" placeholder="Código" name="name" onChange={() => { }} value={data.code} locked={locked} /></Col>
                    <Col md={6}><Input label="Patente" placeholder="Patente" name="name" onChange={() => { }} value={data.plate} locked={locked} /></Col>
                    <Col md={6}><Input label="Marca" placeholder="Marca" name="name" onChange={() => { }} value={data.company} locked={locked} /></Col>
                    <Col md={6}><Input label="Modelo" placeholder="Modelo" name="name" onChange={() => { }} value={data.model} locked={locked} /></Col>
                    <Col md={6}><Input label="Año" placeholder="Año" name="name" onChange={() => { }} value={data.code} locked={locked} /></Col>
                    <Col md={6}>
                        Formulario
                        <select name="" id="" className="select-icafal" defaultValue="0">
                            <option value="0" disabled>Seleccione...</option>
                            <option value="1">Formulario 1</option>
                            <option value="2">Formulario 2</option>
                            <option value="3">Formulario 3</option>
                            <option value="4">Formulario 4</option>
                            <option value="5">Formulario 5</option>
                            <option value="6">Formulario 6</option>
                        </select>
                    </Col>
                </Row>
                <Row>
                    <Col md={8} />
                    <Col md={4}>
                        <Button text={createMode ? 'Crear' : 'Actualizar'} onClick={this.handleNew} />
                    </Col>
                </Row>
            </>
        );
    }
}

MachineForm.propTypes = {
    callback: PropTypes.func,
    data: PropTypes.object,
    locked: PropTypes.bool,
};

MachineForm.defaultProps = {
    callback: null,
    data: null,
    locked: false,
};

export default MachineForm;
