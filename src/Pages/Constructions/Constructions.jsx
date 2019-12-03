import React, { Component } from 'react';
import ReactTable from 'react-table';
import matchSorter from 'match-sorter';
import { StateContext } from '../../State';
import TopBar from '../../Components/TopBar/TopBar';
import DownloadCSVButton from '../../Components/DownloadCSVButton/DownloadCSVButton';
import ConstructionForm from './ConstructionForm';
import ModalView from '../../Layout/ModalView/ModalView';
import { ConfirmDialog } from '../../Components/Dialog/Dialog';
import { tableConfig } from '../../config';
import { getConstructions, deleteConstruction } from '../../Service/Api';

class Constructions extends Component {
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
                Direccion: item.address,
                Notificaciones: item.notifications,
                Estado: item.status === 'active' ? 'Activo' : 'Inactivo',
                Cliente: item.client.name,
                RazonSocial: item.client.business_name,
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

        await getConstructions()
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

    async removeConstruction() {
        const { deleteId } = this.state;
        await deleteConstruction(deleteId).then((response) => {
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
                        <ConstructionForm data={this.findData(row.original.id)} readOnly />
                    </ModalView>
                ),
                filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['name'] }),
                filterAll: true,
                filterable: true,
            },
            {
                Header: 'Dirección',
                accessor: 'address',
                filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['address'] }),
                filterAll: true,
                filterable: true,
            },
            {
                Header: 'Cliente',
                id: 'clientName',
                accessor: (row) => row.client.name,
                filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['clientName'] }),
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
                        <ModalView title="Editar obra" type="edit" callback={this.loadData}>
                            <ConstructionForm data={this.findData(row.original.id)} />
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
                    <DownloadCSVButton data={this.formattedData()} filename="obras.csv" />
                    <ModalView title="Crear obra" type="add" callback={this.loadData}>
                        <ConstructionForm />
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
                    title="Eliminar obra"
                    onConfirm={() => {
                        this.removeConstruction();
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

Constructions.contextType = StateContext;

export default Constructions;
