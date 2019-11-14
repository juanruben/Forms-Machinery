import React, { Component } from 'react';
// import { StateContext } from '../State';
import {
    Document, Page, Text, View, StyleSheet, PDFViewer, PDFDownloadLink,
} from '@react-pdf/renderer';
import {
    Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import ReactTable from 'react-table';
import TopBar from '../../Components/TopBar/TopBar';
import IconButton from '../../Components/IconButton/IconButton';
import { tableConfig, dummyData } from '../../config';

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showing: false,
            ready: false,
        };

        this.toggle = this.toggle.bind(this);
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
        const columns = [
            {
                Header: 'Fecha',
                accessor: 'date',
            },
            {
                Header: 'Patente',
                accessor: 'plate',
            },
            {
                Header: 'Código',
                accessor: 'code',
            },
            {
                Header: 'Cliente',
                accessor: 'name',
            },
            {
                Header: 'Estado',
                accessor: 'status',
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
                    <IconButton onClick={() => { }} icon="fas fa-file-download" />
                </TopBar>

                <ReactTable
                    data={dummyData}
                    columns={columns}
                    {...tableConfig}
                />

                {/* {docviewr} */}

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
