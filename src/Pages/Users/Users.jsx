import React, { Component } from 'react';
import ReactTable from 'react-table';
import matchSorter from 'match-sorter';
import SweetAlert from 'react-bootstrap-sweetalert';
import TopBar from '../../Components/TopBar/TopBar';
import UserForm from './UserForm';
import { StateContext } from '../../State';
import ModalView from '../../Layout/ModalView/ModalView';
import { tableConfig } from '../../config';
import { getUsers, deleteUser } from '../../Service/Api';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showConfirm: false,
            data: [],
            loading: false,
            deleteId: null,
        };
        this.handleRemove = this.handleRemove.bind(this);
        this.loadData = this.loadData.bind(this);
        this.findData = this.findData.bind(this);
        this.removeUser = this.removeUser.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    findData = (id) => {
        const { data } = this.state;
        return data.find((item) => item.id === id);
    }

    async loadData() {
        this.setState({
            loading: true,
        });

        await getUsers()
            .then((response) => {
                this.setState({
                    data: response.data,
                    loading: false,
                });
            }).catch((error) => {
                if (error.response.status === 403) {
                    const [, dispatch] = this.context;
                    dispatch({
                        type: 'EXIT',
                    });
                }
            });
    }

    async removeUser() {
        const { deleteId } = this.state;
        await deleteUser(deleteId).then((response) => {
            if (response && response.status === 200) {
                this.loadData();
            }
        });
    }

    handleRemove(id) {
        this.setState({
            showConfirm: true,
            deleteId: id,
        });
    }

    render() {
        const { showConfirm, data, loading } = this.state;
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
                Header: 'Apellido',
                accessor: 'last_name',
                filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['last_name'] }),
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
                Header: 'Usuario',
                accessor: 'username',
                maxWidth: 150,
                filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['username'] }),
                filterAll: true,
                filterable: true,
            },
            {
                Header: 'Perfil',
                accessor: 'role_id',
                width: 130,
                Cell: (row) => (
                    <>{row.original.role_id === 1 ? 'Administrador' : 'Operador'}</>
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
                filterable: false,
                sortable: false,
                maxWidth: 100,
                Cell: (row) => (
                    <div className="form-actions">
                        <ModalView title="Editar usuario" type="edit" callback={this.loadData}>
                            <UserForm data={this.findData(row.original.id)} />
                        </ModalView>
                        <button onClick={() => { this.handleRemove(row.original.id); }} type="button">
                            <i className="fas fa-trash" />
                        </button>
                    </div>
                ),
            },
        ];

        return (
            <>
                <TopBar>
                    <ModalView title="Crear usuario" type="add" callback={this.loadData}>
                        <UserForm />
                    </ModalView>
                </TopBar>

                <ReactTable
                    data={data}
                    columns={columns}
                    {...tableConfig}
                    loading={loading}
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
                        this.removeUser();
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

Users.contextType = StateContext;

export default Users;
