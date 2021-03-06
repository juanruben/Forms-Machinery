/* eslint-disable camelcase */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Spinner } from 'reactstrap';
import { StateContext } from '../../State';
import Input from '../../Components/Input/Input';
import Select from '../../Components/Select/Select';
import Button from '../../Components/Button/Button';
import { validateEmailList } from '../../Service/Utils';

import { addConstruction, updateConstruction, getClients } from '../../Service/Api';

const status_options = [
    {
        id: 'active',
        name: 'Activo',
    },
    {
        id: 'finished',
        name: 'Finalizado',
    },
];

class ConstructionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createMode: true,
            id: null,
            data: {},
            errors: {},
            clients: [],
            loadingClients: false,
        };
        this.handleCreate = this.handleCreate.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.onChange = this.onChange.bind(this);
        this.validForm = this.validForm.bind(this);
        this.loadClients = this.loadClients.bind(this);
    }

    componentDidMount() {
        const { data } = this.props;
        if (data) {
            this.setState({
                id: data.id,
                data: {
                    name: data.name,
                    address: data.address,
                    client_id: data.client.id,
                    notifications: data.notifications,
                    status: data.status,
                },
                createMode: false,
            });
        }
        this.loadClients();
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

    async loadClients() {
        this.setState({ loadingClients: true });
        await getClients()
            .then((response) => {
                this.setState({
                    clients: response.data,
                    loadingClients: false,
                });
            }).catch((error) => {
                this.handleError(error);
            });
    }

    validForm() {
        const { data, createMode } = this.state;
        const {
            name, address, client_id, notifications, status,
        } = data;
        const errors = {};
        let formIsValid = true;

        if (!name || name.trim().length === 0) {
            formIsValid = false;
            errors.name = 'Requerido';
        }

        if (!address || address.trim().length === 0) {
            formIsValid = false;
            errors.address = 'Requerido';
        }

        if (!client_id || client_id === 0) {
            formIsValid = false;
            errors.client_id = 'Requerido';
        }

        if (!notifications || notifications.trim().length === 0) {
            formIsValid = false;
            errors.notifications = ['Requerido'];
        } else if (!validateEmailList(notifications)) {
            formIsValid = false;
            errors.notifications = 'Error de formato en una o varias direcciones';
        }

        if (!createMode) {
            if (!status || status === 0) {
                formIsValid = false;
                errors.status = 'Requerido';
            }
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

            await addConstruction(data).then((response) => {
                if (response && response.status === 201) {
                    const { callback } = this.props;
                    callback();
                }
            }).catch((error) => {
                this.handleError(error);
            });

            this.toggleLoading(false);
        }
    }

    async handleUpdate() {
        if (this.validForm()) {
            this.toggleLoading(true);
            const { data, id } = this.state;

            await updateConstruction(data, id).then((response) => {
                if (response && response.status === 200) {
                    const { callback } = this.props;
                    callback();
                }
            }).catch((error) => {
                this.handleError(error);
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
            createMode, errors, data, loading, clients, loadingClients,
        } = this.state;
        const {
            name, address, client_id, notifications, status,
        } = data;

        const rest = {
            onChange: this.onChange,
            errors,
            required: true,
            readOnly,
        };

        return (
            <>
                <Row>
                    <Col md={12}><Input name="name" label="Nombre" value={name} icon="fas fa-industry" {...rest} /></Col>
                    <Col md={12}><Input name="address" label="Dirección" value={address} icon="fas fa-map-marked-alt" {...rest} /></Col>
                    <Col md={12}><Select name="client_id" label="Cliente" value={client_id} options={clients} placeholder="Seleccione..." {...rest} loading={loadingClients} /></Col>
                    {!createMode && (
                        <Col md={12}><Select name="status" label="Estado" value={status} options={status_options} placeholder="Seleccione..." {...rest} /></Col>
                    )}
                    <Col md={12}><Input name="notifications" label="Emails" placeholder="correo1@ejemplo.com, correo2@ejemplo.com, ..." value={notifications} icon="far fa-envelope" {...rest} /></Col>
                    <Col md={12}>
                        * Puede agregar TODAS las que necesite.
                        Estas direcciones de correo recibirán reporte y estado de
                        las maquinarias cuando estas salgan del taller hacia la obra del cliente
                    </Col>
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

ConstructionForm.propTypes = {
    callback: PropTypes.func,
    data: PropTypes.object,
    readOnly: PropTypes.bool,
};

ConstructionForm.defaultProps = {
    callback: null,
    data: null,
    readOnly: false,
};

ConstructionForm.contextType = StateContext;

export default ConstructionForm;
