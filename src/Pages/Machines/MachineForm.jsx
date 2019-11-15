import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import Select from '../../Components/Select/Select';

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
        const { readOnly } = this.props;
        const { data, createMode } = this.state;
        const forms = [
            {
                id: 1,
                name: 'Formulario 1',
            },
            {
                id: 2,
                name: 'Formulario 2',
            },
            {
                id: 3,
                name: 'Formulario 3',
            },
        ];
        return (
            <>
                <Row>
                    <Col md={12}><Input label="Nombre" placeholder="Nombre" name="name" onChange={() => { }} value={data.machine} readOnly={readOnly} /></Col>
                    <Col md={6}><Input label="Código" placeholder="Código" name="name" onChange={() => { }} value={data.code} readOnly={readOnly} /></Col>
                    <Col md={6}><Input label="Patente" placeholder="Patente" name="name" onChange={() => { }} value={data.plate} readOnly={readOnly} /></Col>
                    <Col md={6}><Input label="Marca" placeholder="Marca" name="name" onChange={() => { }} value={data.company} readOnly={readOnly} /></Col>
                    <Col md={6}><Input label="Modelo" placeholder="Modelo" name="name" onChange={() => { }} value={data.model} readOnly={readOnly} /></Col>
                    <Col md={6}><Input label="Año" placeholder="Año" name="name" onChange={() => { }} value={data.code} readOnly={readOnly} /></Col>
                    <Col md={6}><Select label="Formulario" options={forms} placeholder="Seleccione..." name="name" onChange={() => { }} value={data.code} readOnly={readOnly} /></Col>
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
    readOnly: PropTypes.bool,
};

MachineForm.defaultProps = {
    callback: null,
    data: null,
    readOnly: false,
};

export default MachineForm;
