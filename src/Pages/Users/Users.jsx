import React, { Component } from 'react';
import ReactTable from 'react-table';
import matchSorter from 'match-sorter';
import TopBar from '../../Components/TopBar/TopBar';
import UserForm from './UserForm';
import { StateContext } from '../../State';
import ModalView from '../../Layout/ModalView/ModalView';
import { tableConfig } from '../../config';
import { ConfirmDialog } from '../../Components/Dialog/Dialog';
import { formatRut, formatPhone } from '../../Service/Utils';
import { getUsers, deleteUser, restoreUser } from '../../Service/Api';

class Users extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            showConfirm: false,
            data: [],
            loading: false,
            deleteId: null,
            restoreId: null,
        };
        this.handleRemove = this.handleRemove.bind(this);
        this.handleRestore = this.handleRestore.bind(this);
        this.loadData = this.loadData.bind(this);
        this.findData = this.findData.bind(this);
        this.removeUser = this.removeUser.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.loadData();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    findData = (id) => {
        const { data } = this.state;
        return data.find((item) => item.id === id);
    }

    handleError = (error) => {
        const { status } = error.response;
        if (status === 401 || status === 403) {
            const [, dispatch] = this.context;
            dispatch({
                type: 'EXIT',
            });
        }
    }

    async loadData() {
        this.setState({
            loading: true,
        });

        await getUsers()
            .then((response) => {
                if (this._isMounted) {
                    this.setState({
                        data: response.data,
                        loading: false,
                        deleteId: null,
                        restoreId: null,
                    });
                }
            }).catch((error) => {
                this.handleError(error);
            });
    }

    async removeUser() {
        const { deleteId } = this.state;
        await deleteUser(deleteId).then((response) => {
            if (response && response.status === 200) {
                this.loadData();
            }
        }).catch((error) => {
            this.handleError(error);
        });
    }

    async restoreUser() {
        const { restoreId } = this.state;
        await restoreUser(restoreId).then((response) => {
            if (response && response.status === 200) {
                this.loadData();
            }
        }).catch((error) => {
            this.handleError(error);
        });
    }

    handleRemove(id) {
        this.setState({
            showConfirm: true,
            deleteId: id,
        });
    }

    handleRestore(id) {
        this.setState({
            showConfirm: true,
            restoreId: id,
        });
    }

    render() {
        const {
            showConfirm, data, loading, deleteId, restoreId,
        } = this.state;
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
                Cell: (row) => (
                    <span>{formatRut(row.original.rut)}</span>
                ),
                filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['rut'] }),
                filterAll: true,
                filterable: true,
            },
            {
                Header: 'Teléfono',
                accessor: 'phone',
                maxWidth: 150,
                Cell: (row) => (
                    <a href={`tel:${row.original.phone}`}>{formatPhone(row.original.phone)}</a>
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
                        {!row.original.deleted_at && (
                            <button disabled={!row.original.delectable} onClick={() => { this.handleRemove(row.original.id); }} type="button">
                                <i className="fas fa-trash" />
                            </button>
                        )}
                        {row.original.deleted_at && (
                            <button onClick={() => { this.handleRestore(row.original.id); }} type="button">
                                <i className="fas fa-undo" />
                            </button>
                        )}
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

                <ConfirmDialog
                    show={showConfirm}
                    title={deleteId ? 'Eliminar usuario' : 'Restablecer usuario'}
                    onConfirm={() => {
                        if (deleteId) {
                            this.removeUser();
                        }
                        if (restoreId) {
                            this.restoreUser();
                        }
                        this.setState({ showConfirm: false });
                    }}
                    onCancel={() => {
                        this.setState({ showConfirm: false });
                    }}
                />
            </>
        );
    }
}

Users.contextType = StateContext;

export default Users;
