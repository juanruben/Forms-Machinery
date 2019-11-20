import React, { Component } from 'react';
import ReactTable from 'react-table';
import SweetAlert from 'react-bootstrap-sweetalert';
import matchSorter from 'match-sorter';
import TopBar from '../../Components/TopBar/TopBar';
import DownloadCSVButton from '../../Components/DownloadCSVButton/DownloadCSVButton';
import ConstructionForm from './ConstructionForm';
import ModalView from '../../Layout/ModalView/ModalView';
import { tableConfig } from '../../config';
import { getConstructions, deleteConstruction } from '../../Service/Api';

class Constructions extends Component {
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

        await getConstructions()
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

    async removeConstruction() {
        const { deleteId } = this.state;
        await deleteConstruction(deleteId).then((response) => {
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
                    <DownloadCSVButton data={data} filename="obras.csv" />
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

                <SweetAlert
                    show={showConfirm}
                    warning
                    showCancel
                    confirmBtnText="Sí, estoy seguro"
                    cancelBtnText="No, Cancelar"
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title="Eliminar obra"
                    onConfirm={() => {
                        this.removeConstruction();
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

export default Constructions;
