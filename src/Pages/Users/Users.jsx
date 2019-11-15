import React, { Component } from 'react';
// import { StateContext } from '../State';
import ReactTable from 'react-table';
import matchSorter from 'match-sorter';
import SweetAlert from 'react-bootstrap-sweetalert';
import TopBar from '../../Components/TopBar/TopBar';
import UserForm from './UserForm';
import ModalView from '../../Layout/ModalView/ModalView';
import { tableConfig, dummyData } from '../../config';

class Users extends Component {
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
                        <UserForm data={this.findData(row.original.id)} readOnly />
                    </ModalView>
                ),
                filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['name'] }),
                filterAll: true,
                filterable: true,
            },
            {
                Header: 'RUT',
                accessor: 'rut',
                maxWidth: 100,
                filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['rut'] }),
                filterAll: true,
                filterable: true,
            },
            {
                Header: 'Teléfono',
                accessor: 'phone',
                maxWidth: 150,
                Cell: (row) => (
                    <a href={`tel:${row.original.phone}`}>{row.original.phone}</a>
                ),
                filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['phone'] }),
                filterAll: true,
                filterable: true,
            },
            {
                Header: 'Email',
                accessor: 'email',
                Cell: (row) => (
                    <a href={`mailto:${row.original.email}`}>{row.original.email}}</a>
                ),
                filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['email'] }),
                filterAll: true,
                filterable: true,
            },
            {
                Header: 'Perfil',
                accessor: 'profile',
                width: 130,
                Cell: (row) => (
                    <>{row.original.profile === 1 ? 'Administrador' : 'Operador'}</>
                ),
                filterMethod: (filter, row) => {
                    if (filter.value === 'all') {
                        return true;
                    }
                    if (filter.value === '1') {
                        return row[filter.id] === 1;
                    }
                    if (filter.value === '2') {
                        return row[filter.id] === 2;
                    }
                    return row[filter.id] === 0;
                },
                Filter: ({ filter, onChange }) => (
                    <select
                        onChange={(event) => onChange(event.target.value)}
                        className="table-select-top"
                        style={{ width: '100%', height: '100%' }}
                        value={filter ? filter.value : 'all'}
                    >
                        <option value="">Todo...</option>
                        <option value="1">Administrador</option>
                        <option value="2">Operador</option>
                    </select>
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
                        <ModalView title="Editar usuario" type="edit">
                            <UserForm data={this.findData(row.original.id)} />
                        </ModalView>
                        <span className="form-actions__icon" onClick={this.handleRemove}><i className="fas fa-trash" /></span>
                    </div>
                ),
            },
        ];

        return (
            <>
                <TopBar>
                    <ModalView title="Crear usuario" type="add">
                        <UserForm />
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
