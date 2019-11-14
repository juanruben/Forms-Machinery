import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SweetAlert from 'react-bootstrap-sweetalert';
import { withRouter } from 'react-router-dom';
// import { StateContext } from '../State';
import ReactTable from 'react-table';
import TopBar from '../../Components/TopBar/TopBar';
import FormForm from './FormForm';
import ModalAdd from '../../Components/ModalAdd/ModalAdd';
import ModalEdit from '../../Components/ModalEdit/ModalEdit';
import { tableConfig, dummyData } from '../../config';

class Forms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showConfirm: false,
        };
        this.handleRemove = this.handleRemove.bind(this);
        this.onViewClick = this.onViewClick.bind(this);
    }

    onViewClick() {
        const { history } = this.props;
        history.push('/admin/formularios/12');
    }

    handleRemove() {
        this.setState({ showConfirm: true });
    }

    render() {
        const { showConfirm } = this.state;
        const columns = [
            {
                Header: 'Nombre',
                accessor: 'machine',
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
                        <span className="form-actions__icon" onClick={this.onViewClick}><i className="fas fa-eye" /></span>
                        <span className="form-actions__icon"><i className="far fa-copy" /></span>
                        <ModalEdit title="Editar formulario">
                            <FormForm />
                        </ModalEdit>
                        <span className="form-actions__icon" onClick={this.handleRemove}><i className="fas fa-trash" /></span>
                    </div>
                ),
            },
        ];

        return (
            <>
                <TopBar>
                    <ModalAdd title="Crear formulario">
                        <FormForm />
                    </ModalAdd>
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
