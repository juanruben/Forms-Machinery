import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { StateContext } from '../../State';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import Select from '../../Components/Select/Select';

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


class MachineForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createMode: true,
            data: {},
            errors: {},
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
        const { data, errors } = this.state;
        data[name] = value;
        errors[name] = '';
        this.setState({
            data,
            errors,
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
        const { data, createMode, errors } = this.state;
        const {
            code, company, plate, model, year, machine,
        } = data;

        return (
            <>
                <Row>
                    <Col md={12}><Input label="Nombre" placeholder="Nombre" name="company" onChange={() => { }} value={machine} readOnly={readOnly} errors={errors} /></Col>
                    <Col md={6}><Input label="Código" placeholder="Código" name="code" onChange={() => { }} value={code} readOnly={readOnly} errors={errors} /></Col>
                    <Col md={6}><Input label="Patente" placeholder="Patente" name="plate" onChange={() => { }} value={plate} readOnly={readOnly} errors={errors} /></Col>
                    <Col md={6}><Input label="Marca" placeholder="Marca" name="brand" onChange={() => { }} value={company} readOnly={readOnly} errors={errors} /></Col>
                    <Col md={6}><Input label="Modelo" placeholder="Modelo" name="model" onChange={() => { }} value={model} readOnly={readOnly} errors={errors} /></Col>
                    <Col md={6}><Input label="Año" placeholder="Año" name="year" onChange={() => { }} value={year} readOnly={readOnly} errors={errors} /></Col>
                    <Col md={6}><Select label="Formulario" options={forms} placeholder="Seleccione..." name="name" onChange={() => { }} value={code} readOnly={readOnly} errors={errors} /></Col>
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

MachineForm.contextType = StateContext;

export default MachineForm;
