import React, { Component } from 'react';
import ReactTable from 'react-table';
import matchSorter from 'match-sorter';
import { StateContext } from '../../State';
import TopBar from '../../Components/TopBar/TopBar';
import DownloadCSVButton from '../../Components/DownloadCSVButton/DownloadCSVButton';
import MachineForm from './MachineForm';
import ConstructionClientView from '../Constructions/ConstructionClientView';
import ModalView from '../../Layout/ModalView/ModalView';
import { ConfirmDialog } from '../../Components/Dialog/Dialog';
import { getMachines, deleteMachine } from '../../Service/Api';
import { tableConfig } from '../../config';

class Machines extends Component {
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

    findClient = (machineId) => {
        const { data } = this.state;
        return data.find((item) => item.id === machineId).client;
    }

    findConstruction = (machineId) => {
        const { data } = this.state;
        return data.find((item) => item.id === machineId).construction;
    }

    getStatus = (value) => {
        if (value === '1') return 'En obra';
        if (value === '2') return 'En taller';
        return 'Mantenimiento';
    }

    formattedData = () => {
        const { data } = this.state;
        const result = [];
        data.forEach((item) => {
            result.push({
                id: item.id,
                Nombre: item.name,
                Codigo: item.code,
                NumeroSerie: item.serie,
                Patente: item.plate,
                Modelo: item.model,
                Marca: item.brand,
                Año: item.year,
                Estado: item.status,
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
        this.setState({ loading: true });

        await getMachines()
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

    async removeMachine() {
        const { deleteId } = this.state;
        await deleteMachine(deleteId).then((response) => {
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
                filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['name'] }),
                filterAll: true,
                filterable: true,
            },
            {
                Header: 'Código',
                accessor: 'code',
                Cell: (row) => (
                    <ModalView title={row.original.code} callback={this.loadData}>
                        <MachineForm data={this.findData(row.original.id)} readOnly />
                    </ModalView>
                ),
                maxWidth: 100,
                filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['plate'] }),
                filterAll: true,
                filterable: true,
            },
            {
                Header: 'Patente',
                accessor: 'plate',
                maxWidth: 100,
                filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['plate'] }),
                filterAll: true,
                filterable: true,
            },
            {
                Header: 'Marca',
                accessor: 'brand',
                filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['serie'] }),
                filterAll: true,
                filterable: true,
            },
            {
                Header: 'Modelo',
                accessor: 'model',
                filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['model'] }),
                filterAll: true,
                filterable: true,
            },
            {
                Header: 'Estado',
                accessor: 'status',
                width: 130,
                Cell: (row) => {
                    if (row.original.status === 'En obra') {
                        return (
                            <ModalView title="En obra" callback={this.loadData}>
                                <ConstructionClientView construction={this.findConstruction(row.original.id)} client={this.findClient(row.original.id)} />
                            </ModalView>
                        );
                    }
                    return <>{row.original.status}</>;
                },
                filterMethod: (filter, row) => {
                    if (filter.value === 'all') {
                        return true;
                    }
                    if (filter.value === 'En obra') {
                        return row[filter.id] === 'En obra';
                    }
                    if (filter.value === 'En taller') {
                        return row[filter.id] === 'En taller';
                    }
                    if (filter.value === 'Mantenimiento') {
                        return row[filter.id] === 'Mantenimiento';
                    }
                    return row[filter.id] === 0;
                },
                Filter: ({ filter, onChange }) => (
                    <select
                        onChange={(event) => onChange(event.target.value)}
                        className="table-select-top"
                        style={{ width: '100%', height: '100%' }}
                        value={filter ? filter.value : 'all'}
                    >
                        <option value="">Todo...</option>
                        <option value="En obra">En obra</option>
                        <option value="En taller">En taller</option>
                        <option value="Mantenimiento">Mantenimiento</option>
                    </select>
                ),
            },
            {
                Header: 'Acciones',
                id: 'actions',
                filterable: false,
                sortable: false,
                maxWidth: 100,
                Cell: (row) => (
                    <div className="form-actions">
                        <ModalView title="Editar máquina" type="edit" callback={this.loadData}>
                            <MachineForm data={this.findData(row.original.id)} />
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
                    <DownloadCSVButton data={this.formattedData()} filename="maquinas.csv" />
                    <ModalView title="Crear máquina" type="add" callback={this.loadData}>
                        <MachineForm />
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
                    title="Eliminar máquina"
                    onConfirm={() => {
                        this.removeMachine();
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

Machines.contextType = StateContext;

export default Machines;
