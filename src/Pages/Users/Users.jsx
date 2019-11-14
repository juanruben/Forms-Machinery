import React, { Component } from 'react';
// import { StateContext } from '../State';
import ReactTable from 'react-table';
import SweetAlert from 'react-bootstrap-sweetalert';
import TopBar from '../../Components/TopBar/TopBar';
import UserForm from './UserForm';
import ModalAdd from '../../Components/ModalAdd/ModalAdd';
import ModalEdit from '../../Components/ModalEdit/ModalEdit';
import { tableConfig, dummyData } from '../../config';

class Users extends Component {
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
            },
            {
                Header: 'RUT',
                accessor: 'rut',
            },
            {
                Header: 'Teléfono',
                accessor: 'phone',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Perfil',
                accessor: 'profile',
            },
            {
                Header: 'Acciones',
                id: 'actions',
                accessor: (row) => null,
                filterable: false,
                sortable: false,
                maxWidth: 150,
                Cell: (row) => (
                    <div className="form-actions">
                        <span className="form-actions__icon"><i className="fas fa-eye" /></span>
                        <ModalEdit title="Editar usuario">
                            <UserForm />
                        </ModalEdit>
                        <span className="form-actions__icon" onClick={this.handleRemove}><i className="fas fa-trash" /></span>
                    </div>
                ),
            },
        ];

        return (
            <>
                <TopBar>
                    <ModalAdd title="Crear usuario">
                        <UserForm />
                    </ModalAdd>
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
                    title="Eliminar usuario"
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

export default Users;
