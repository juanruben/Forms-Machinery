import React, { Component } from 'react';
import PropTypes from 'prop-types';
import matchSorter from 'match-sorter';
import { withRouter } from 'react-router-dom';
import ReactTable from 'react-table';
import { StateContext } from '../../State';
import TopBar from '../../Components/TopBar/TopBar';
import FormForm from './FormForm';
import ModalView from '../../Layout/ModalView/ModalView';
import { getForms, deleteForm, copyForm } from '../../Service/Api';
import { ConfirmDialog } from '../../Components/Dialog/Dialog';
import { tableConfig } from '../../config';
import './Forms.scss';

class Forms extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            showConfirm: false,
            data: [],
            loading: false,
            deleteId: null,
        };
        this.loadData = this.loadData.bind(this);
        this.handleCopy = this.handleCopy.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.onViewClick = this.onViewClick.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.loadData();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onViewClick(id) {
        const { history } = this.props;
        history.push(`/admin/formularios/${id}`);
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
        await getForms()
            .then((response) => {
                if (this._isMounted) {
                    this.setState({
                        data: response.data,
                        loading: false,
                    });
                }
            }).catch((error) => {
                this.handleError(error);
            });
    }

    async removeForm() {
        const { deleteId } = this.state;
        await deleteForm(deleteId)
            .then((response) => {
                if (response && response.status === 200) {
                    this.loadData();
                }
            }).catch((error) => {
                this.handleError(error);
            });
    }

    async handleCopy(id) {
        const [, dispatch] = this.context;
        dispatch({
            type: 'SET_LOADING',
            value: true,
        });

        await copyForm(id)
            .then((response) => {
                if (response && response.status === 200) {
                    this.loadData();
                }
            }).catch((error) => {
                this.handleError(error);
            });

        dispatch({
            type: 'SET_LOADING',
            value: false,
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
                    <button className="link-button" onClick={() => { this.onViewClick(row.original.id); }} type="button">
                        {row.original.name}
                    </button>
                ),
                filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['name'] }),
                filterAll: true,
                filterable: true,
            },
            {
                Header: 'Acciones',
                id: 'actions',
                filterable: false,
                sortable: false,
                maxWidth: 150,
                Cell: (row) => (
                    <div className="form-actions">
                        <button onClick={() => { this.handleCopy(row.original.id); }} type="button">
                            <i className="far fa-copy" />
                        </button>
                        <ModalView title="Editar formulario" type="edit" callback={this.loadData}>
                            <FormForm data={this.findData(row.original.id)} />
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
                    <ModalView title="Crear formulario" type="add" callback={this.loadData}>
                        <FormForm />
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
                    title="Eliminar campo"
                    onConfirm={() => {
                        this.removeForm();
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

Forms.contextType = StateContext;

Forms.propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.shape({
        path: PropTypes.string.isRequired,
    }),
};

Forms.defaultProps = {
    match: {
        path: '',
    },
};


export default withRouter(Forms);
