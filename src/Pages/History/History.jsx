import React, { Component } from 'react';
import ReactTable from 'react-table';
import TopBar from '../../Components/TopBar/TopBar';
import DownloadCSVButton from '../../Components/DownloadCSVButton/DownloadCSVButton';
import { tableConfig } from '../../config';
import ClientForm from '../Clients/ClientForm';
import MachineForm from '../Machines/MachineForm';
import ModalView from '../../Layout/ModalView/ModalView';
import { getRegisters } from '../../Service/Api';

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
        };
        this.loadData = this.loadData.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    findMachine = (registerId) => {
        const { data } = this.state;
        return data.find((item) => item.id === registerId).machine;
    }

    findClient = (registerId) => {
        const { data } = this.state;
        return data.find((item) => item.id === registerId).client;
    }

    formattedData = () => {
        const { data } = this.state;
        const result = [];
        data.forEach((item) => {
            result.push({
                id: item.id,
                FechaCreacion: item.created_at,
                Tipo: item.type === 'checkin' ? 'Entrada' : 'Salida',
                Cliente: item.client.name,
                RazonSocial: item.client.business_name,
                Obra: item.construction.name,
                Direccion: item.construction.address,
                Maquina: item.machine.name,
                CodigoMaquina: item.machine.code,
                Patente: item.machine.plate,
                Modelo: item.machine.model,
                Marca: item.machine.brand,
                Año: item.machine.year,
                Reporte: item.pdf,
                CreadoPor: `${item.user.name} ${item.user.last_name} (${item.user.username})`,
            });
        });
        return result;
    }

    async loadData() {
        this.setState({
            loading: true,
        });

        await getRegisters()
            .then((response) => {
                console.log(response.data);
                this.setState({
                    data: response.data,
                    loading: false,
                });
            }).catch((error) => {
                if (error.response.status === 403 || error.response.status === 401 || error.response.status === 500) {
                    const [, dispatch] = this.context;
                    dispatch({
                        type: 'EXIT',
                    });
                }
            });
    }

    render() {
        const { data, loading } = this.state;

        const columns = [
            {
                Header: 'Fecha',
                accessor: 'created_at',
                maxWidth: 150,
            },
            {
                Header: 'Tipo',
                accessor: 'type',
                maxWidth: 80,
                Cell: (row) => (
                    <div>{row.original.type === 'checkin' ? 'Entrada' : 'Salida'}</div>
                ),
                filterMethod: (filter, row) => {
                    if (filter.value === 'all') {
                        return true;
                    }
                    return row[filter.id] === filter.value;
                },
                Filter: ({ filter, onChange }) => (
                    <select
                        onChange={(event) => onChange(event.target.value)}
                        className="table-select-top"
                        style={{ width: '100%', height: '100%' }}
                        value={filter ? filter.value : 'all'}
                    >
                        <option value="">Todo...</option>
                        <option value="checkin">Entrada</option>
                        <option value="checkout">Salida</option>
                    </select>
                ),

            },
            {
                Header: 'Código',
                accessor: 'machine.code',
                maxWidth: 80,
                Cell: (row) => (
                    <ModalView title={row.original.machine.code}>
                        <MachineForm data={this.findMachine(row.original.id)} readOnly />
                    </ModalView>
                ),
            },
            {
                Header: 'Cliente',
                accessor: 'client.name',
                Cell: (row) => (
                    <ModalView title={row.original.client.name}>
                        <ClientForm data={this.findClient(row.original.id)} readOnly />
                    </ModalView>
                ),
            },
            {
                Header: 'Estado',
                accessor: 'machine.status',
                width: 130,
                filterMethod: (filter, row) => {
                    if (filter.value === 'all') {
                        return true;
                    }
                    return row[filter.id] === filter.value;
                },
                Filter: ({ filter, onChange }) => (
                    <select
                        onChange={(event) => onChange(event.target.value)}
                        className="table-select-top"
                        style={{ width: '100%', height: '100%' }}
                        value={filter ? filter.value : 'all'}
                    >
                        <option value="">Todo...</option>
                        <option value="En taller">En taller</option>
                        <option value="En obra">En obra</option>
                        <option value="Mantenimiento">Mantenimiento</option>
                    </select>
                ),
            },
            {
                Header: 'Ver',
                accessor: 'pdf',
                id: 'pdf',
                filterable: false,
                sortable: false,
                maxWidth: 50,
                Cell: (row) => (
                    <div className="form-actions">
                        <a className="form-actions__icon" href={row.original.pdf} target="_blank" rel="noopener noreferrer">
                            <i className="fas fa-eye" />
                        </a>
                    </div>
                ),
            },
        ];

        return (
            <>
                <TopBar>
                    <DownloadCSVButton data={this.formattedData()} filename="historial.csv" />
                </TopBar>

                <ReactTable
                    data={data}
                    columns={columns}
                    {...tableConfig}
                    loading={loading}
                />
            </>
        );
    }
}

export default History;
