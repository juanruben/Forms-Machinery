import React, { Component } from 'react';
// import { StateContext } from '../State';
import ReactTable from 'react-table';
import matchSorter from 'match-sorter';
import SweetAlert from 'react-bootstrap-sweetalert';
import TopBar from '../../Components/TopBar/TopBar';
import DownloadCSVButton from '../../Components/DownloadCSVButton/DownloadCSVButton';
import MachineForm from './MachineForm';
import ModalView from '../../Layout/ModalView/ModalView';
import { tableConfig, dummyData } from '../../config';

class Machines extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showConfirm: false,
        };
        this.handleRemove = this.handleRemove.bind(this);
        this.findData = this.findData.bind(this);
    }

    getStatus = (value) => {
        if (value === 1) return 'En terreno';
        if (value === 2) return 'En taller';
        return 'Mantenimiento';
    }

    findData = (id) => dummyData.find((item) => item.id === id);

    handleRemove() {
        this.setState({ showConfirm: true });
    }

    render() {
        const { showConfirm } = this.state;
        const columns = [
            {
                Header: 'Nombre',
                accessor: 'name',
                Cell: (row) => (
                    <ModalView title={row.original.name}>
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
                maxWidth: 100,
                filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['model'] }),
                filterAll: true,
                filterable: true,
            },
            {
                Header: 'Estado',
                accessor: 'status',
                width: 130,
                Cell: (row) => (
                    <>{this.getStatus(row.original.status)}</>
                ),
                filterMethod: (filter, row) => {
                    if (filter.value === 'all') {
                        return true;
                    }
                    if (filter.value === '1') {
                        return row[filter.id] === 1;
                    }
                    if (filter.value === '2') {
                        return row[filter.id] === 2;
                    }
                    if (filter.value === '3') {
                        return row[filter.id] === 3;
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
                        <option value="1">En terreno</option>
                        <option value="2">En taller</option>
                        <option value="3">Mantenimiento</option>
                    </select>
                ),
            },
            {
                Header: 'Último movimiento',
                accessor: 'date',
                maxWidth: 150,
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
                        <ModalView title="Editar máquina" type="edit">
                            <MachineForm data={this.findData(row.original.id)} />
                        </ModalView>
                        <button onClick={this.handleRemove} type="button">
                            <i className="fas fa-trash" />
                        </button>
                    </div>
                ),
            },
        ];

        return (
            <>
                <TopBar>
                    <DownloadCSVButton data={dummyData} filename="maquinas.csv" />
                    <ModalView title="Crear máquina" type="add">
                        <MachineForm />
                    </ModalView>
                </TopBar>

                <ReactTable
                    data={dummyData}
                    columns={columns}
                    {...tableConfig}
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
