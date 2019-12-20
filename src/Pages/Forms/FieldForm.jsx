/* eslint-disable camelcase */
import React, { Component } from 'react';
import { Row, Col, Spinner } from 'reactstrap';
import PropTypes from 'prop-types';
import { StateContext } from '../../State';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import Select from '../../Components/Select/Select';
import Simple from '../../Components/Simple/Simple';
import ItemOption from '../../Components/ItemOption/ItemOption';
import { addField, updateField } from '../../Service/Api';

const types = [
    {
        id: 1,
        name: 'Texto',
    },
    {
        id: 2,
        name: 'Check',
    },
    {
        id: 3,
        name: 'Múltiples opciones',
    },
    {
        id: 4,
        name: 'Imagen',
    },
];

class FieldForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createMode: true,
            data: {
                options: [],
            },
            errors: {},
            newOption: '',
        };
        this.onChange = this.onChange.bind(this);
        this.onChangeBoolean = this.onChangeBoolean.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
    }

    componentDidMount() {
        const { data } = this.props;
        if (data) {
            switch (data.type) {
                case 'text':
                    data.type = '1';
                    data.options = [];
                    break;
                case 'simple':
                    data.type = '2';
                    break;
                case 'multiple':
                    data.type = '3';
                    break;
                case 'image':
                    data.type = '4';
                    data.options = [];
                    break;
                default:
                    data.type = '1';
            }

            this.setState({
                data,
                createMode: false,
            });
        }
    }

    // On Actions

    onChange(event) {
        const { name, value } = event.target;
        const { data, errors } = this.state;
        let { newOption } = this.state;
        if (name === 'newOption') {
            newOption = value;
        } else {
            data[name] = value;
        }

        errors[name] = '';
        this.setState({
            data,
            errors,
            newOption,
        });
    }

    onChangeBoolean(event) {
        const { name, checked } = event.target;
        const { data, errors } = this.state;
        data[name] = checked;
        errors[name] = '';
        this.setState({
            data,
            errors,
        });
    }

    // Handlers

    handleError = (error) => {
        const { status } = error.response;
        if (status === 401 || status === 403) {
            const [, dispatch] = this.context;
            dispatch({
                type: 'EXIT',
            });
        } else {
            this.setState({
                errors: error.response.data.errors,
            });
        }
    }

    async handleCreate() {
        const { data } = this.state;
        const { section_id } = this.props;

        if (this.validationRules()) {
            const dataForm = {
                name: data.name,
                required: data.required ? 1 : 0,
                comments: data.comments ? 1 : 0,
            };

            switch (data.type) {
                case '1':
                    dataForm.type = 'text';
                    break;
                case '2':
                    dataForm.type = 'simple';
                    dataForm.options = [
                        {
                            id: 1,
                            name: 'Si',
                        },
                        {
                            id: 2,
                            name: 'No',
                        },
                    ];
                    data.options = dataForm.options;
                    break;
                case '3':
                    dataForm.type = 'multiple';
                    dataForm.options = data.options;
                    break;
                case '4':
                    dataForm.type = 'image';
                    break;
                default:
                    dataForm.type = 'text';
            }

            this.toggleLoading(true);

            await addField(dataForm, section_id)
                .then(() => {
                    const { callback } = this.props;
                    callback();
                }).catch((error) => {
                    this.handleError(error);
                });

            this.toggleLoading(false);
        }
    }

    async handleUpdate() {
        const { data } = this.state;

        if (this.validationRules()) {
            const dataForm = {
                name: data.name,
                required: data.required ? 1 : 0,
                comments: data.comments ? 1 : 0,
            };

            switch (data.type) {
                case '1':
                    dataForm.type = 'text';
                    break;
                case '2':
                    dataForm.type = 'simple';
                    dataForm.options = ['Si', 'No'];
                    data.options = dataForm.options;
                    break;
                case '3':
                    dataForm.type = 'multiple';
                    dataForm.options = data.options;
                    break;
                case '4':
                    dataForm.type = 'image';
                    break;
                default:
                    dataForm.type = 'text';
            }

            this.toggleLoading(true);

            await updateField(dataForm, data.id)
                .then(() => {
                    const { callback } = this.props;
                    callback();
                }).catch((error) => {
                    this.handleError(error);
                });

            this.toggleLoading(false);
        }
    }

    handleAddOption() {
        const { data, newOption } = this.state;
        const { options } = data;
        const count = data.options.length;
        const errors = {};
        if (newOption.trim().length === 0) {
            errors.newOption = 'Requerido';
        } else {
            const item = {
                id: `${count}-${newOption}`,
                name: newOption,
            };
            options.push(item);
        }

        data.options = options;

        this.setState({
            data,
            errors,
            newOption: '',
        });
    }

    handleDeleteOption(event) {
        const { data } = this.state;
        const { options } = data;
        options.splice(event.target.value, 1);

        data.options = options;
        this.setState({
            data,
            newOption: '',
        });
    }

    // Toggle functions

    toggleLoading(value) {
        this.setState({
            loading: value,
        });
    }

    // Validations

    validationRules() {
        const { data } = this.state;
        const { name, type } = data;
        const errors = {};
        let formIsValid = true;

        if (!name || name.trim().length === 0) {
            formIsValid = false;
            errors.name = 'Requerido';
        }

        if (!type) {
            formIsValid = false;
            errors.type = 'Requerido';
        }

        if (data.type === '3') {
            if (data.options.length <= 1) {
                formIsValid = false;
                errors.opciones = 'Requerido al menos 2 opciónes';
            }
        }

        this.setState({
            errors,
        });

        return formIsValid;
    }

    render() {
        const {
            createMode, errors, data, newOption, loading,
        } = this.state;
        const {
            name, type, required, comments, options,
        } = data;

        return (
            <>
                <Input label="Nombre" name="name" placeholder="Nombre" onChange={this.onChange} value={name} errors={errors} required />
                <Select label="Tipo" name="type" options={types} placeholder="Seleccione..." onChange={this.onChange} value={type} errors={errors} required />

                {type === '3' ? (

                    <Row>
                        <Col md={8}>
                            <Input label="Opciones" name="newOption" placeholder="Opciones" onChange={this.onChange} value={newOption} errors={errors} required />

                            {options.map((item) => (
                                <ItemOption text={item.name} onClick={this.handleDeleteOption} value={item.id} key={item.id} />
                            ))}

                        </Col>
                        <Col md={4}>
                            <Button text="Agregar" onClick={this.handleAddOption} className="align-btn" />
                        </Col>
                    </Row>

                ) : ('')}

                {(type !== '2') && <Simple label="Requerido" name="required" onChange={this.onChangeBoolean} value={required === 1} />}

                <Simple label="Observaciones" name="comments" onChange={this.onChangeBoolean} value={comments === 1} />

                <Row>
                    <Col md={8} style={{ textAlign: 'right' }}>{loading && <div className="spinner"><Spinner /></div>}</Col>
                    <Col md={4}>
                        <Button text={createMode ? 'Crear' : 'Actualizar'} onClick={createMode ? this.handleCreate : this.handleUpdate} />
                    </Col>
                </Row>
            </>
        );
    }
}

FieldForm.propTypes = {
    callback: PropTypes.func,
    data: PropTypes.object,
    section_id: PropTypes.number.isRequired,
};

FieldForm.defaultProps = {
    callback: null,
    data: null,
};

FieldForm.contextType = StateContext;

export default FieldForm;
