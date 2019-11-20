import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SweetAlert from 'react-bootstrap-sweetalert';
import matchSorter from 'match-sorter';
import { withRouter } from 'react-router-dom';
import ReactTable from 'react-table';
import { StateContext } from '../../State';
import TopBar from '../../Components/TopBar/TopBar';
import FormForm from './FormForm';
import ModalView from '../../Layout/ModalView/ModalView';
import { getForms, deleteForm } from '../../Service/Api';
import { tableConfig } from '../../config';
import './Forms.scss';

class Forms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showConfirm: false,
            data: [],
            loading: false,
            deleteId: null,
        };
        this.loadData = this.loadData.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.onViewClick = this.onViewClick.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    onViewClick(id) {
        const { history } = this.props;
        history.push(`/admin/formularios/${id}`);
    }

    async loadData() {
        this.setState({
            loading: true,
        });

        await getForms()
            .then((response) => {
                this.setState({
                    data: response.data,
                    loading: false,
                });
            }).catch((error) => {
                if (error.response.status === 403 || error.response.status === 401) {
                    const [, dispatch] = this.context;
                    dispatch({
                        type: 'EXIT',
                    });
                }
            });
    }

    handleRemove() {
        this.setState({ showConfirm: true });
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
                accessor: (row) => null,
                filterable: false,
                sortable: false,
                maxWidth: 150,
                Cell: (row) => (
                    <div className="form-actions">
                        <span className="form-actions__icon"><i className="far fa-copy" /></span>
                        <ModalView title="Editar formulario" type="edit">
                            <FormForm />
                        </ModalView>
                        <button onClick={this.handleRemove} type="button">
                            <i className="fas fa-trash" />
                        </button>
                    </div>
                ),
            },
        ];

        return (
            <>
                <TopBar>
                    <ModalView title="Crear formulario" type="add">
                        <FormForm />
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
                    title="Eliminar formulario"
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
