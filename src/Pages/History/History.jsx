import React, { Component } from 'react';
import {
    Document, Page, Text, View, StyleSheet, PDFViewer, PDFDownloadLink,
} from '@react-pdf/renderer';
import {
    Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import ReactTable from 'react-table';
import matchSorter from 'match-sorter';
import TopBar from '../../Components/TopBar/TopBar';
import DownloadCSVButton from '../../Components/DownloadCSVButton/DownloadCSVButton';
import { tableConfig } from '../../config';
import ClientForm from '../Clients/ClientForm';
import MachineForm from '../Machines/MachineForm';
import ModalView from '../../Layout/ModalView/ModalView';
import { getRegisters } from '../../Service/Api';


const getStatus = (value) => {
    if (value === 1) return 'En terreno';
    if (value === 2) return 'En taller';
    return 'Mantenimiento';
};

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            showing: false,
            ready: false,
            loading: false,
        };
        this.loadData = this.loadData.bind(this);
        this.toggle = this.toggle.bind(this);
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
                if (error && (error.response.status === 403 || error.response.status === 401)) {
                    const [, dispatch] = this.context;
                    dispatch({
                        type: 'EXIT',
                    });
                }
            });
    }

    toggle() {
        this.setState((prevState) => ({
            showing: !prevState.showing,
            ready: false,
        }), () => {
            setTimeout(() => {
                this.setState({ ready: true });
            }, 1);
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
                id: 'actions',
                filterable: false,
                sortable: false,
                maxWidth: 50,
                Cell: () => ( // row
                    <div className="form-actions">
                        <button className="form-actions__icon" onClick={this.toggle} type="button">
                            <i className="fas fa-eye" />
                        </button>
                    </div>
                ),
            },
        ];

        const { showing, ready } = this.state;

        const styles = StyleSheet.create({
            page: {
                flexDirection: 'row',
                backgroundColor: '#FFF',
            },
            section: {
                margin: 10,
                padding: 10,
                flexGrow: 1,
                fontSize: 100,
                fontWeight: 700,
                color: '#CCC',
            },
            text: {
                color: '#F00',
                margin: 10,
                padding: 10,
                flexGrow: 1,
                fontSize: 12,
            },
        });

        const doc = (
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                        <Text>PDF Icafal</Text>
                    </View>
                </Page>
            </Document>
        );

        return (
            <>
                <TopBar>
                    <DownloadCSVButton data={data} filename="historial.csv" />
                </TopBar>

                <ReactTable
                    data={data}
                    columns={columns}
                    {...tableConfig}
                    loading={loading}
                />

                <Modal isOpen={showing} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        Máquina 1...
                    </ModalHeader>
                    <ModalBody>
                        {ready && (
                            <PDFViewer width="100%" height="300px">
                                {doc}
                            </PDFViewer>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        {ready && (
                            <PDFDownloadLink
                                document={doc}
                                fileName="test.pdf"
                                style={{
                                    textDecoration: 'none',
                                    padding: '10px',
                                    color: '#FFF',
                                    backgroundColor: '#FF5900',
                                    borderRadius: '3px',
                                }}
                            >
                                {
                                    ({ blob, url, loading, error }) => (loading ? 'Cargando documento...' : 'Descargar')
                                }
                            </PDFDownloadLink>
                        )}
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}

export default History;
