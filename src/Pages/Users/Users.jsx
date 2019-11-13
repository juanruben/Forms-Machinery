import React, { Component } from 'react';
// import { StateContext } from '../State';
import ReactTable from 'react-table';
import TopBar from '../../Components/TopBar/TopBar';
import UserForm from './UserForm';
import ModalAdd from '../../Components/ModalAdd/ModalAdd';
import { tableConfig, dummyData } from '../../config';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const columns = [
            {
                Header: 'Nombre',
                accessor: 'string1',
            },
            {
                Header: 'RUT',
                accessor: 'number',
            },
            {
                Header: 'Teléfono',
                accessor: 'number',
            },
            {
                Header: 'Email',
                accessor: 'string2',
            },
            {
                Header: 'Perfil',
                accessor: 'string3',
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
                        <span className="form-actions__icon"><i className="fas fa-pen" /></span>
                        <span className="form-actions__icon"><i className="fas fa-trash" /></span>
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
            </>
        );
    }
}

export default Users;
