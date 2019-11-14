import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import SweetAlert from 'react-bootstrap-sweetalert';
import { withRouter } from 'react-router-dom';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import FieldForm from './FieldForm';
import ModalAdd from '../../Components/ModalAdd/ModalAdd';
import Title from '../../Components/Title/Title';
import TopBar from '../../Components/TopBar/TopBar';


import './Sections.scss';

const DragHandle = sortableHandle(() => <span className="section-sort-handle"><i className="fas fa-grip-horizontal" /></span>);

const SortableItem = sortableElement(({ index, value }) => {
    const [showConfirm, setShowConfirm] = useState(false);

    return (
        <>
            <li className="section-item">
                <span>
                    <DragHandle />
                    {value}
                </span>
                <div className="form-actions">
                    <span className="form-actions__icon"><i className="far fa-copy" /></span>
                    <span className="form-actions__icon"><i className="fas fa-pen" /></span>
                    <span className="form-actions__icon" onClick={() => { setShowConfirm(true) }}><i className="fas fa-trash" /></span>
                </div>
            </li>
            <SweetAlert
                show={showConfirm}
                warning
                showCancel
                confirmBtnText="Sí, estoy seguro"
                cancelBtnText="No, Cancelar"
                confirmBtnBsStyle="danger"
                cancelBtnBsStyle="default"
                title="Eliminar campo"
                onConfirm={() => {
                    setShowConfirm(false);
                }}
                onCancel={() => {
                    setShowConfirm(false);
                }}
            >
                ¿Está seguro?
            </SweetAlert>
        </>
    );
});

const SortableContainer = sortableContainer(({ children }) => <ul className="sections-container">{children}</ul>);

class Fields extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [
                {
                    id: 1,
                    name: 'Nombre del campo 1',
                },
                {
                    id: 2,
                    name: 'Nombre del campo 2',
                },
                {
                    id: 3,
                    name: 'Nombre del campo 3',
                },
                {
                    id: 4,
                    name: 'Nombre del campo 4',
                },
                {
                    id: 5,
                    name: 'Nombre del campo 5',
                },
                {
                    id: 6,
                    name: 'Nombre del campo 6',
                },
            ],
        };
    }


    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ items }) => ({
            items: arrayMove(items, oldIndex, newIndex),
        }));
    };

    render() {
        const { items } = this.state;
        const { history } = this.props;

        return (
            <>
                <TopBar>
                    <ModalAdd title="Crear campo">
                        <FieldForm />
                    </ModalAdd>
                </TopBar>
                <button onClick={() => { this.props.history.goBack(); }} className="back-button" type="button">
                    <i className="fas fa-long-arrow-alt-left" />
                    {' '}
                    Volver
                </button>
                <Title text="Campos de la sección [...xyz]>" />
                <SortableContainer
                    onSortEnd={this.onSortEnd}
                    lockAxis="y"
                    useWindowAsScrollContainer
                    useDragHandle
                    helperClass="sections-container"
                >
                    {items.map((item, index) => (
                        <SortableItem
                            key={item.id}
                            index={index}
                            value={item.name}
                            history={history}
                        />
                    ))}
                </SortableContainer>
            </>
        );
    }
}

Fields.propTypes = {
    history: PropTypes.object.isRequired,
};

export default withRouter(Fields);
