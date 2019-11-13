import React, { Component } from 'react';
// import { StateContext } from '../State';
import ReactTable from 'react-table';
import TopBar from '../../Components/TopBar/TopBar';
import IconButton from '../../Components/IconButton/IconButton';
import { tableConfig, dummyData } from '../../config';

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const columns = [
            {
                Header: 'Fecha',
                accessor: 'date',
            },
            {
                Header: 'Patente',
                accessor: 'string1',
            },
            {
                Header: 'Código',
                accessor: 'number',
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
                Header: 'Ver',
                id: 'actions',
                accessor: (row) => null,
                filterable: false,
                sortable: false,
                maxWidth: 50,
                Cell: (row) => (
                    <div className="form-actions">
                        <span className="form-actions__icon"><i className="fas fa-eye" /></span>
                    </div>
                ),
            },
        ];

        return (
            <>
                <TopBar>
                    <IconButton onClick={() => { }} icon="fas fa-file-download" />
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

export default History;
