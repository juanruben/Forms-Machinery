import React, { Component } from 'react';
// import { StateContext } from '../State';
import ReactTable from 'react-table';
import TopBar from '../../Components/TopBar/TopBar';
import FormForm from './FormForm';
import ModalAdd from '../../Components/ModalAdd/ModalAdd';
import { tableConfig } from '../../config';

class Forms extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const data = [
            {
                id: 1,
                name: 'AAA',
            },
            {
                id: 2,
                name: 'BBB',
            },
            {
                id: 2,
                name: 'CCCC',
            },
            {
                id: 2,
                name: 'AAA',
            },
            {
                id: 2,
                name: 'BBB',
            },
            {
                id: 2,
                name: 'CCCC',
            },
            {
                id: 2,
                name: 'AAA',
            },
            {
                id: 2,
                name: 'BBB',
            },
            {
                id: 2,
                name: 'CCCC',
            },
            {
                id: 2,
                name: 'AAA',
            },
            {
                id: 2,
                name: 'BBB',
            },
            {
                id: 2,
                name: 'CCCC',
            },
        ];

        const columns = [
            {
                Header: 'Nombre',
                accessor: 'name',
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
                    <ModalAdd title="Crear formulario">
                        <FormForm />
                    </ModalAdd>
                </TopBar>

                <ReactTable
                    data={data}
                    columns={columns}
                    {...tableConfig}
                />
            </>
        );
    }
}

export default Forms;
