import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import SectionForm from './SectionForm';
import ModalAdd from '../../Components/ModalAdd/ModalAdd';
import Title from '../../Components/Title/Title';
import TopBar from '../../Components/TopBar/TopBar';

import './Sections.scss';

const DragHandle = sortableHandle(() => <span className="section-sort-handle"><i className="fas fa-grip-horizontal" /></span>);

const SortableItem = sortableElement(({ index, value, history }) => {
    const onViewClick = () => {
        history.push(`/admin/formularios/secciones/${index}`);
    };

    return (
        <li className="section-item">
            <span>
                <DragHandle />
                {value}
            </span>
            <div className="form-actions">
                <span className="form-actions__icon" onClick={onViewClick}><i className="fas fa-eye" /></span>
                <span className="form-actions__icon"><i className="far fa-copy" /></span>
                <span className="form-actions__icon"><i className="fas fa-pen" /></span>
                <span className="form-actions__icon"><i className="fas fa-trash" /></span>
            </div>
        </li>
    );
});

const SortableContainer = sortableContainer(({ children }) => <ul className="sections-container">{children}</ul>);

class Sections extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [
                {
                    id: 1,
                    name: 'Nombre de sección 1',
                },
                {
                    id: 2,
                    name: 'Nombre de sección 2',
                },
                {
                    id: 3,
                    name: 'Nombre de sección 3',
                },
                {
                    id: 4,
                    name: 'Nombre de sección 4',
                },
                {
                    id: 5,
                    name: 'Nombre de sección 5',
                },
                {
                    id: 6,
                    name: 'Nombre de sección 6',
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
                    <ModalAdd title="Crear sección de formulario">
                        <SectionForm />
                    </ModalAdd>
                </TopBar>
                <Title text="Secciones del formulario [...]" />

                <SortableContainer
                    onSortEnd={this.onSortEnd}
                    lockAxis="y"
                    useWindowAsScrollContainer
                    useDragHandle
                    helperClass="sections-container"
                >
                    {items.map((item) => (
                        <SortableItem
                            key={item.id}
                            index={item.id}
                            value={item.name}
                            history={history}
                        />
                    ))}
                </SortableContainer>
            </>
        );
    }
}

Sections.propTypes = {
    history: PropTypes.object.isRequired,
};

export default withRouter(Sections);
