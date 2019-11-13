import React, { Component } from 'react';
// import { StateContext } from '../State';
import ReactTable from 'react-table';
import TopBar from '../../Components/TopBar/TopBar';
import IconButton from '../../Components/IconButton/IconButton';
import MachineForm from './MachineForm';
import ModalAdd from '../../Components/ModalAdd/ModalAdd';
import { tableConfig, dummyData } from '../../config';

class Machines extends Component {
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
                Header: 'Patente',
                accessor: 'number',
            },
            {
                Header: 'Modelo',
                accessor: 'string2',
            },
            {
                Header: 'Ubicación',
                accessor: 'string3',
            },
            {
                Header: 'Cliente',
                accessor: 'string3',
            },
            {
                Header: 'Estado',
                accessor: 'string4',
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
                    data={dummyData}
                    columns={columns}
                    {...tableConfig}
                />
            </>
        );
    }
}

export default Machines;
