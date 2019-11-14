import React, { Component } from 'react';
// import { StateContext } from '../State';
import ReactTable from 'react-table';
import SweetAlert from 'react-bootstrap-sweetalert';
import TopBar from '../../Components/TopBar/TopBar';
import IconButton from '../../Components/IconButton/IconButton';
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
    }

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
                        <MachineForm />
                    </ModalView>
                ),
            },
            {
                Header: 'Patente',
                accessor: 'plate',
                maxWidth: 100,
            },
            {
                Header: 'Modelo',
                accessor: 'model',
                maxWidth: 100,
            },
            {
                Header: 'Ubicación',
                accessor: 'address',
            },
            {
                Header: 'Cliente',
                accessor: 'contact',
            },
            {
                Header: 'Estado',
                accessor: 'status',
                maxWidth: 100,
            },
            {
                Header: 'Último movimiento',
                accessor: 'date',
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
                            <MachineForm />
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
