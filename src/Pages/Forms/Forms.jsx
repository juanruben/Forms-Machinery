import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SweetAlert from 'react-bootstrap-sweetalert';
import matchSorter from 'match-sorter';
import { withRouter } from 'react-router-dom';
// import { StateContext } from '../State';
import ReactTable from 'react-table';
import TopBar from '../../Components/TopBar/TopBar';
import FormForm from './FormForm';
import ModalView from '../../Layout/ModalView/ModalView';
import './Forms.scss';

const forms = [
    {
        id: 1,
        name: 'Nombre del Formulario',
    },
    {
        id: 2,
        name: 'Nombre del Formulario2',
    },
];

class Forms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showConfirm: false,
        };
        this.handleRemove = this.handleRemove.bind(this);
        this.onViewClick = this.onViewClick.bind(this);
    }

    onViewClick(id) {
        const { history } = this.props;
        history.push(`/admin/formularios/${id}`);
    }

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
                    data={forms}
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

Forms.propTypes = {
    history: PropTypes.object.isRequired,
};

export default withRouter(Forms);
