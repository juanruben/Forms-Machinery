import React, { Component } from 'react';
// import { StateContext } from '../State';
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
import { tableConfig, dummyData } from '../../config';
import ClientForm from '../Clients/ClientForm';
import MachineForm from '../Machines/MachineForm';
import ModalView from '../../Layout/ModalView/ModalView';

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showing: false,
            ready: false,
        };

        this.toggle = this.toggle.bind(this);
    }

    getStatus(value) {
        if (value === 1) return 'En terreno';
        if (value === 2) return 'En taller';
        return 'Mantenimiento';
    }

    findData = (id) => dummyData.find((item) => item.id === id);

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
        const columns = [
            {
                Header: 'Fecha',
                accessor: 'date',
                maxWidth: 150,
            },
            {
                Header: 'Patente',
                accessor: 'plate',
                maxWidth: 100,
                Cell: (row) => (
                    <ModalView title={row.original.plate}>
                        <MachineForm data={this.findData(row.original.id)} readOnly />
                    </ModalView>
                ),
            },
            {
                Header: 'Código',
                accessor: 'code',
                maxWidth: 100,
                filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['code'] }),
                filterAll: true,
                filterable: true,
            },
            {
                Header: 'Cliente',
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
                Header: 'Ver',
                id: 'actions',
                accessor: (row) => null,
                filterable: false,
                sortable: false,
                maxWidth: 50,
                Cell: (row) => (
                    <div className="form-actions">
                        <span className="form-actions__icon" onClick={this.toggle}><i className="fas fa-eye" /></span>
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
                    <DownloadCSVButton data={dummyData} filename="historial.csv" />
                </TopBar>

                <ReactTable
                    data={dummyData}
                    columns={columns}
                    {...tableConfig}
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
                                    ({ blob, url, loading, error }) =>
                                        (loading ? 'Cargando documento...' : 'Descargar')
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
