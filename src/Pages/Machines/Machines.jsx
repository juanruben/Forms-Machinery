import React, { Component } from 'react';
// import { StateContext } from '../State';
import ReactTable from 'react-table';
import matchSorter from 'match-sorter';
import SweetAlert from 'react-bootstrap-sweetalert';
import TopBar from '../../Components/TopBar/TopBar';
import DownloadCSVButton from '../../Components/DownloadCSVButton/DownloadCSVButton';
import MachineForm from './MachineForm';
import ModalView from '../../Layout/ModalView/ModalView';
import { getMachines, deleteMachine } from '../../Service/Api';
import { tableConfig } from '../../config';

class Machines extends Component {
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

    async loadData() {
        this.setState({
            loading: true,
        });

        await getMachines()
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

    async removeMachine() {
        const { deleteId } = this.state;
        await deleteMachine(deleteId).then((response) => {
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
                    <ModalView title={row.original.name} callback={this.loadData}>
                        <MachineForm data={this.findData(row.original.id)} readOnly />
                    </ModalView>
                ),
                filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['name'] }),
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
                Cell: (row) => (
                    <>{row.original.status}</>
                ),
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

                <SweetAlert
                    show={showConfirm}
                    warning
                    showCancel
                    confirmBtnText="Sí, estoy seguro"
                    cancelBtnText="No, Cancelar"
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title="Eliminar máquina"
                    onConfirm={() => {
                        this.removeMachine();
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

export default Machines;
