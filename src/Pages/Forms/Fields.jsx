import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import SweetAlert from 'react-bootstrap-sweetalert';
import { withRouter } from 'react-router-dom';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import FieldForm from './FieldForm';
import ModalView from '../../Layout/ModalView/ModalView';
import Title from '../../Components/Title/Title';
import TopBar from '../../Components/TopBar/TopBar';

import './sortable.scss';
import image from './image.png';
import text from './text.png';
import simple from './simple.png';
import multiple from './multiple.png';

const SortableContainer = sortableContainer(({ children }) => <ul className="sortable-container">{children}</ul>);

const DragHandle = sortableHandle(() => <span className="drag-handle"><i className="fas fa-grip-horizontal" /></span>);

const SortableItem = sortableElement(({ index, value, type }) => {
    const [showConfirm, setShowConfirm] = useState(false);

    function getIcon(fff) {
        switch (fff) {
            case 'text':
                return text;
            case 'image':
                return image;
            case 'simple':
                return simple;
            case 'multiple':
                return multiple;
            default:
                return '';
        }
    }

    return (
        <>
            <li className="sortable-item">
                <span>
                    <DragHandle />
                    <img src={getIcon(type)} alt="" style={{ width: '25px' }} />
                    <button className="link-button" disabled type="button">
                        {value}
                    </button>
                </span>
                <div className="form-actions">
                    <button type="button">
                        <i className="far fa-copy" />
                    </button>
                    <ModalView title="Editar campo" type="edit">
                        <FieldForm />
                    </ModalView>
                    <button onClick={() => { setShowConfirm(true); }} type="button">
                        <i className="fas fa-trash" />
                    </button>
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

class Fields extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [
                {
                    id: 1,
                    name: 'Nombre del campo 1',
                    type: 'text',
                },
                {
                    id: 2,
                    name: 'Nombre del campo 2',
                    type: 'multiple',
                },
                {
                    id: 3,
                    name: 'Nombre del campo 3',
                    type: 'image',
                },
                {
                    id: 4,
                    name: 'Nombre del campo 4',
                    type: 'multiple',
                },
                {
                    id: 5,
                    name: 'Nombre del campo 5',
                    type: 'simple',
                },
                {
                    id: 6,
                    name: 'Nombre del campo 6',
                    type: 'text',
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
                    <ModalView title="Crear campo" type="add">
                        <FieldForm />
                    </ModalView>
                </TopBar>
                <button onClick={() => { history.goBack(); }} className="back-button" type="button">
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
                    helperClass="sortable-container"
                >
                    {items.map((item, index) => (
                        <SortableItem
                            key={item.id}
                            index={index}
                            value={item.name}
                            type={item.type}
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
