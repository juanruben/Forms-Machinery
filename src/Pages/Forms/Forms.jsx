import React, { Component } from 'react';
// import { StateContext } from '../State';
import ReactTable from 'react-table';
import TopBar from '../../Components/TopBar/TopBar';
import FormForm from './FormForm';
import ModalAdd from '../../Components/ModalAdd/ModalAdd';

class Forms extends Component {
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

        const columns = [{
            Header: 'Name',
            accessor: 'name', // String-based value accessors!
        }, {
            Header: 'Age',
            accessor: 'age',
            Cell: (props) => <span className="number">{props.value}</span>, // Custom cell components!
        }, {
            id: 'friendName', // Required because our accessor is not a string
            Header: 'Friend Name',
            accessor: (d) => d.friend.name, // Custom value accessors!
        }, {
            Header: (props) => <span>Friend Age</span>, // Custom header components!
            accessor: 'friend.age',
        }];

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
                    filterable
                    className="-striped"
                    defaultPageSize={10}
                    previousText="Anterior"
                    nextText="Siguiente"
                    loadingText="Cargando"
                    noDataText="Sin datos"
                    pageText="Página"
                    ofText="de"
                    rowsText="formularios"
                />
            </>
        );
    }
}

export default Forms;
