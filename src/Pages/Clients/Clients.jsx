import React, { Component } from 'react';
// import { StateContext } from '../State';
import ReactTable from 'react-table';
import SweetAlert from 'react-bootstrap-sweetalert';
import TopBar from '../../Components/TopBar/TopBar';
import IconButton from '../../Components/IconButton/IconButton';
import ClientForm from './ClientForm';
import ModalView from '../../Layout/ModalView/ModalView';
import { tableConfig, dummyData } from '../../config';

class Clients extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showConfirm: false,
        };
        this.handleRemove = this.handleRemove.bind(this);
        this.findData = this.findData.bind(this);
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
                        <ClientForm data={this.findData(row.original.id)} locked />
                    </ModalView>
                ),
            },
            {
                Header: 'Rut',
                accessor: 'rut',
                maxWidth: 100,
            },
            {
                Header: 'Contacto',
                accessor: 'contact',
            },
            {
                Header: 'Email',
                accessor: 'email',
                Cell: (row) => (
                    <a href={`mailto:${row.original.email}`}>{row.original.email}}</a>
                ),
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
                        <ModalView title="Editar cliente" type="edit">
                            <ClientForm data={this.findData(row.original.id)} />
                        </ModalView>
                        <span className="form-actions__icon" onClick={this.handleRemove}><i className="fas fa-trash" /></span>
                    </div>
                ),
            },
        ];

        return (
            <>
                <TopBar>
                    <IconButton onClick={() => { }} icon="fas fa-file-download" />
                    <ModalView title="Crear cliente" type="add">
                        <ClientForm />
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
                    title="Eliminar cliente"
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

export default Clients;
