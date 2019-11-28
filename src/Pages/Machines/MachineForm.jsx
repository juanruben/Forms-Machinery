/* eslint-disable camelcase */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Spinner } from 'reactstrap';
import { StateContext } from '../../State';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import Select from '../../Components/Select/Select';
import { addMachine, updateMachine, getForms } from '../../Service/Api';

class MachineForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createMode: true,
            data: {},
            forms: [],
            errors: {},
            loading: false,
            estado: [
                {
                    id: 1,
                    name: 'En Taller',
                },
                {
                    id: 2,
                    name: 'En Obra',
                },
                {
                    id: 3,
                    name: 'Mantenimiento',
                },
            ],
        };
        this.handleCreate = this.handleCreate.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.statusToString = this.statusToString.bind(this);
        this.onChange = this.onChange.bind(this);
        this.loadForms = this.loadForms.bind(this);
    }

    componentDidMount() {
        const { data } = this.props;
        if (data) {
            data.status = this.stringToStatus(data.status);
            this.setState({
                data,
                createMode: false,
            });
        }
        this.loadForms();
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

    statusToString = (code) => {
        let status = '';

        switch (code) {
            case '1':
                status = 'En taller';
                break;
            case '2':
                status = 'En obra';
                break;
            case '3':
                status = 'Mantenimiento';
                break;
            default:
                status = 'En taller';
        }

        return status;
    }

    stringToStatus = (code) => {
        let status = '';

        switch (code) {
            case 'En taller':
                status = '1';
                break;
            case 'En obra':
                status = '2';
                break;
            case 'Mantenimiento':
                status = '3';
                break;
            default:
                status = '1';
        }

        return status;
    }

    async loadForms() {
        this.setState({
            loading: true,
        });

        await getForms()
            .then((response) => {
                this.setState({
                    forms: response.data,
                    loading: false,
                });
            }).catch((error) => {
                if (error.response.status === 403 || error.response.status === 401) {
                    const [, dispatch] = this.context;
                    dispatch({
                        type: 'EXIT',
                    });
                }
            });
    }


    validForm() {
        const { data } = this.state;
        const {
            name, code, plate, model, brand, year, model_form_id, status,
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

        if (!status || status.trim().length === 0) {
            formIsValid = false;
            errors.status = ['Requerido'];
        }

        if (!model_form_id || model_form_id === 0) {
            formIsValid = false;
            errors.model_form_id = ['Requerido'];
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

            data.status = this.statusToString(data.status);

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
            data.status = this.statusToString(data.status);
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
            data, createMode, errors, loading, forms, estado,
        } = this.state;
        const {
            name, code, plate, model, brand, year, model_form_id, status,
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
                    <Col md={6}><Input label="Año" name="year" value={year} type="number" {...rest} /></Col>
                    <Col md={6}><Select label="Formulario" options={forms} placeholder="Seleccione..." name="model_form_id" value={String(model_form_id)} {...rest} /></Col>
                    {!readOnly && (
                        <Col md={12}><Select label="Estado" options={estado} placeholder="Seleccione..." name="status" value={status} {...rest} /></Col>
                    )}
                    {readOnly && (
                        <Col md={6}><Input label="Estado" name="status" value={this.statusToString(status)} type="text" {...rest} /></Col>
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
