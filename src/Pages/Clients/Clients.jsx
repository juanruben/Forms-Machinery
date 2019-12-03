import React, { Component } from 'react';
import ReactTable from 'react-table';
import matchSorter from 'match-sorter';
import TopBar from '../../Components/TopBar/TopBar';
import { StateContext } from '../../State';
import DownloadCSVButton from '../../Components/DownloadCSVButton/DownloadCSVButton';
import ClientForm from './ClientForm';
import ModalView from '../../Layout/ModalView/ModalView';
import { ConfirmDialog } from '../../Components/Dialog/Dialog';
import { tableConfig } from '../../config';
import { formatRut, formatPhone } from '../../Service/Utils';
import { getClients, deleteClient } from '../../Service/Api';

class Clients extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            showConfirm: false,
            data: [],
            loading: false,
            deleteId: null,
        };
        this.loadData = this.loadData.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.findData = this.findData.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.loadData();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    findData = (id) => {
        const { data } = this.state;
        return data.find((item) => item.id === id);
    }

    formattedData = () => {
        const { data } = this.state;
        const result = [];
        data.forEach((item) => {
            result.push({
                id: item.id,
                Nombre: item.name,
                RazonSocial: item.business_name,
                Rut: item.rut,
                Direccion: item.address,
                Correo: item.email,
                Estado: item.status === 'active' ? 'Activo' : 'Inactivo',
                FechaCreacion: item.created_at,
            });
        });
        return result;
    }

    handleError = (error) => {
        const { status } = error.response;
        if (status === 401 || status === 403) {
            const [, dispatch] = this.context;
            dispatch({
                type: 'EXIT',
            });
        }
    }

    async loadData() {
        this.setState({
            loading: true,
        });

        await getClients()
            .then((response) => {
                if (this._isMounted) {
                    this.setState({
                        data: response.data,
                        loading: false,
                    });
                }
            }).catch((error) => {
                this.handleError(error);
            });
    }

    async removeClient() {
        const { deleteId } = this.state;
        await deleteClient(deleteId).then((response) => {
            if (response && response.status === 200) {
                this.loadData();
            }
        }).catch((error) => {
            this.handleError(error);
        });
    }

    handleRemove(id) {
        this.setState({
            showConfirm: true,
            deleteId: id,
        });
    }

    render() {
        const { showConfirm, data, loading } = this.state;

        const columns = [
            {
                Header: 'Nombre',
                accessor: 'name',
                Cell: (row) => (
                    <ModalView title={row.original.name}>
                        <ClientForm data={this.findData(row.original.id)} readOnly />
                    </ModalView>
                ),
                filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['name'] }),
                filterAll: true,
                filterable: true,
            },
            {
                Header: 'Rut',
                accessor: 'rut',
                maxWidth: 100,
                Cell: (row) => (
                    <span>{formatRut(row.original.rut)}</span>
                ),
                filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['rut'] }),
                filterAll: true,
                filterable: true,
            },
            {
                Header: 'Teléfono de contacto',
                accessor: 'contact',
                Cell: (row) => (
                    <a href={`tel:${row.original.contact}`}>{formatPhone(row.original.contact)}</a>
                ),
                filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['contact'] }),
                filterAll: true,
                filterable: true,
            },
            {
                Header: 'Email',
                accessor: 'email',
                Cell: (row) => (
                    <a href={`mailto:${row.original.email}`}>
                        {row.original.email}
                    </a>
                ),
                filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['email'] }),
                filterAll: true,
                filterable: true,
            },
            {
                Header: 'Acciones',
                id: 'actions',
                filterable: false,
                sortable: false,
                maxWidth: 100,
                Cell: (row) => (
                    <div className="form-actions">
                        <ModalView title="Editar cliente" type="edit" callback={this.loadData}>
                            <ClientForm data={this.findData(row.original.id)} />
                        </ModalView>
                        <button onClick={() => { this.handleRemove(row.original.id); }} type="button">
                            <i className="fas fa-trash" />
                        </button>
                    </div>
                ),
            },
        ];

        return (
            <>
                <TopBar>
                    <DownloadCSVButton data={this.formattedData()} filename="clientes.csv" />
                    <ModalView title="Crear cliente" type="add" callback={this.loadData}>
                        <ClientForm />
                    </ModalView>
                </TopBar>

                <ReactTable
                    data={data}
                    columns={columns}
                    {...tableConfig}
                    loading={loading}
                />

                <ConfirmDialog
                    show={showConfirm}
                    title="Eliminar cliente"
                    onConfirm={() => {
                        this.removeClient();
                        this.setState({ showConfirm: false });
                    }}
                    onCancel={() => {
                        this.setState({ showConfirm: false });
                    }}
                />
            </>
        );
    }
}

Clients.contextType = StateContext;

export default Clients;
