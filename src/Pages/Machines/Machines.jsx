import React, { Component } from 'react';
// import { StateContext } from '../State';
import ReactTable from 'react-table';
import TopBar from '../../Components/TopBar/TopBar';
import IconButton from '../../Components/IconButton/IconButton';
import MachineForm from './MachineForm';
import ModalAdd from '../../Components/ModalAdd/ModalAdd';

class Machines extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const data = [
            {
                name: 'AAA',
                age: 21,
                friend: {
                    name: 'Jason Maurer',
                    age: 23,
                },
            },
            {
                name: 'BBB',
                age: 26,
                friend: {
                    name: 'Jason Maurer',
                    age: 23,
                },
            },
            {
                name: 'CCCC',
                age: 36,
                friend: {
                    name: 'Jason Maurer',
                    age: 23,
                },
            },
            {
                name: 'AAA',
                age: 21,
                friend: {
                    name: 'Jason Maurer',
                    age: 23,
                },
            },
            {
                name: 'BBB',
                age: 26,
                friend: {
                    name: 'Jason Maurer',
                    age: 23,
                },
            },
            {
                name: 'CCCC',
                age: 36,
                friend: {
                    name: 'Jason Maurer',
                    age: 23,
                },
            },
            {
                name: 'AAA',
                age: 21,
                friend: {
                    name: 'Jason Maurer',
                    age: 23,
                },
            },
            {
                name: 'BBB',
                age: 26,
                friend: {
                    name: 'Jason Maurer',
                    age: 23,
                },
            },
            {
                name: 'CCCC',
                age: 36,
                friend: {
                    name: 'Jason Maurer',
                    age: 23,
                },
            },
            {
                name: 'AAA',
                age: 21,
                friend: {
                    name: 'Jason Maurer',
                    age: 23,
                },
            },
            {
                name: 'BBB',
                age: 26,
                friend: {
                    name: 'Jason Maurer',
                    age: 23,
                },
            },
            {
                name: 'CCCC',
                age: 36,
                friend: {
                    name: 'Jason Maurer',
                    age: 23,
                },
            },
        ];

        const columns = [
            {
                Header: 'Nombre',
                accessor: 'name',
            },
            {
                Header: 'Patente',
                accessor: 'age',
            },
            {
                Header: 'Modelo',
                accessor: 'name',
            },
            {
                Header: 'Ubicación',
                accessor: 'name',
            },
            {
                Header: 'Cliente',
                accessor: 'name',
            },
            {
                Header: 'Estado',
                accessor: 'name',
            },
            {
                Header: 'Último movimiento',
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
                    <IconButton onClick={() => { }} icon="fas fa-file-download" />
                    <ModalAdd title="Crear máquina">
                        <MachineForm />
                    </ModalAdd>
                </TopBar>

                <ReactTable
                    data={data}
                    columns={columns}
                    filterable
                    className="-striped"
                    defaultPageSize={10}
                    previousText="Anterior"
                    nextText="Siguiente"
                    loadingText="Cargando"
                    noDataText="Sin datos"
                    pageText="Página"
                    ofText="de"
                    rowsText="máquinas"
                />
            </>
        );
    }
}

export default Machines;
