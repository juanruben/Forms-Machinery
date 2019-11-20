/* eslint-disable camelcase */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Spinner } from 'reactstrap';
import { StateContext } from '../../State';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import Select from '../../Components/Select/Select';
import { addMachine, updateMachine } from '../../Service/Api';

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
            loading: false,
        };
        this.handleCreate = this.handleCreate.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.onChange = this.onChange.bind(this);
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

    validForm() {
        const { data } = this.state;
        const {
            name, code, plate, model, brand, year, form_id,
        } = data;
        const errors = {};
        let formIsValid = true;

        if (!name || name.trim().length === 0) {
            formIsValid = false;
            errors.name = ['Requerido'];
        }

        if (!code || code.trim().length === 0) {
            formIsValid = false;
            errors.code = ['Requerido'];
        }

        if (!plate || plate.trim().length === 0) {
            formIsValid = false;
            errors.plate = ['Requerido'];
        }

        if (!model || model.trim().length === 0) {
            formIsValid = false;
            errors.model = ['Requerido'];
        }

        if (!brand || brand.trim().length === 0) {
            formIsValid = false;
            errors.brand = ['Requerido'];
        }

        if (!year || year.trim().length === 0) {
            formIsValid = false;
            errors.year = ['Requerido'];
        }

        if (!form_id || form_id === 0) {
            formIsValid = false;
            errors.role_id = ['Requerido'];
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

            await addMachine(data).then((response) => {
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

            await updateMachine(data).then((response) => {
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
            data, createMode, errors, loading,
        } = this.state;
        const {
            name, code, plate, model, brand, year, form_id,
        } = data;

        const rest = {
            onChange: this.onChange,
            readOnly,
            errors,
        };

        return (
            <>
                <Row>
                    <Col md={12}><Input label="Nombre" name="name" value={name} {...rest} /></Col>
                    <Col md={6}><Input label="Código" name="code" value={code} {...rest} /></Col>
                    <Col md={6}><Input label="Patente" name="plate" value={plate} {...rest} /></Col>
                    <Col md={6}><Input label="Modelo" name="model" value={model} {...rest} /></Col>
                    <Col md={6}><Input label="Marca" name="brand" value={brand} {...rest} /></Col>
                    <Col md={6}><Input label="Año" name="year" value={year} {...rest} /></Col>
                    <Col md={6}><Select label="Formulario" options={forms} placeholder="Seleccione..." name="form_id" value={String(form_id)} {...rest} /></Col>
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
