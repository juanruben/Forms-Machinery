import React, { Component } from 'react';
import ReactTable from 'react-table';
import SweetAlert from 'react-bootstrap-sweetalert';
import matchSorter from 'match-sorter';
import TopBar from '../../Components/TopBar/TopBar';
import { StateContext } from '../../State';
import DownloadCSVButton from '../../Components/DownloadCSVButton/DownloadCSVButton';
import ClientForm from './ClientForm';
import ModalView from '../../Layout/ModalView/ModalView';
import { tableConfig } from '../../config';
import { getClients, deleteClient } from '../../Service/Api';

class Clients extends Component {
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
        this.loadData();
    }

    findData = (id) => {
        const { data } = this.state;
        return data.find((item) => item.id === id);
    }

    async loadData() {
        this.setState({
            loading: true,
        });

        await getClients()
            .then((response) => {
                this.setState({
                    data: response.data,
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

    async removeClient() {
        const { deleteId } = this.state;
        await deleteClient(deleteId).then((response) => {
            if (response && response.status === 200) {
                this.loadData();
            }
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
                filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['rut'] }),
                filterAll: true,
                filterable: true,
            },
            {
                Header: 'Contacto',
                accessor: 'contact',
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
                accessor: (row) => null,
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
                    <DownloadCSVButton data={data} filename="clientes.csv" />
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

                <SweetAlert
                    show={showConfirm}
                    warning
                    showCancel
                    confirmBtnText="Sí, estoy seguro"
                    cancelBtnText="No, Cancelar"
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title="Eliminar cliente"
                    onConfirm={() => {
                        this.removeClient();
                        this.setState({
                            showConfirm: false,
                        });
                    }}
                    onCancel={() => {
                        this.setState({
                            showConfirm: false,
                        });
                    }}
                >
                    ¿Está seguro?
                </SweetAlert>
            </>
        );
    }
}

Clients.contextType = StateContext;

export default Clients;
