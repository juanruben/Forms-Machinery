import React, { Component } from 'react';
// import { StateContext } from '../State';
import ReactTable from 'react-table';
import TopBar from '../../Components/TopBar/TopBar';
import IconButton from '../../Components/IconButton/IconButton';
import ClientForm from './ClientForm';
import ModalAdd from '../../Components/ModalAdd/ModalAdd';
import { tableConfig, dummyData } from '../../config';

class Clients extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const columns = [
            {
                Header: 'Nombre',
                accessor: 'name',
            },
            {
                Header: 'Rut',
                accessor: 'rut',
            },
            {
                Header: 'Contacto',
                accessor: 'contact',
            },
            {
                Header: 'Email',
                accessor: 'email',
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
                    <IconButton onClick={() => { }} icon="fas fa-file-download" />
                    <ModalAdd title="Crear cliente">
                        <ClientForm />
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

export default Clients;
