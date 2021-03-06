/* eslint-disable camelcase */
import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { Spinner } from 'reactstrap';
import { StateContext } from '../../State';
import SectionForm from './SectionForm';
import ModalView from '../../Layout/ModalView/ModalView';
import Title from '../../Components/Title/Title';
import TopBar from '../../Components/TopBar/TopBar';
import { ConfirmDialog } from '../../Components/Dialog/Dialog';
import {
    getForm, orderSection, deleteSection, copySection,
} from '../../Service/Api';

import './sortable.scss';

const SortableContainer = sortableContainer(({ children }) => <ul className="sortable-container">{children}</ul>);

const DragHandle = sortableHandle(() => <span className="drag-handle"><i className="fas fa-grip-horizontal" /></span>);

const SortableItem = sortableElement(({
    value, history, data, callback, callbackError,
}) => {
    const [showConfirm, setShowConfirm] = useState(false);

    const onViewClick = () => {
        history.push(`/admin/formularios/secciones/${data.id}`);
    };

    async function handleRemove() {
        await deleteSection(data.id)
            .then(() => {
                callback();
            }).catch((error) => {
                callbackError(error);
            });
    }

    async function handleCopy() {
        await copySection(data.id)
            .then(() => {
                callback();
            }).catch((error) => {
                callbackError(error);
            });
    }

    return (
        <>
            <li className="sortable-item">
                <span>
                    <DragHandle />
                    <button className="link-button highlight" onClick={onViewClick} type="button">
                        {value}
                    </button>
                </span>
                <div className="form-actions">
                    <button onClick={handleCopy} type="button">
                        <i className="far fa-copy" />
                    </button>
                    <ModalView title="Editar sección de formulario" type="edit" callback={callback}>
                        <SectionForm data={data} form_id={data.id} />
                    </ModalView>
                    <button onClick={() => { setShowConfirm(true); }} type="button">
                        <i className="fas fa-trash" />
                    </button>
                </div>
            </li>

            <ConfirmDialog
                show={showConfirm}
                title="Eliminar sección"
                onConfirm={() => {
                    handleRemove();
                    setShowConfirm(false);
                }}
                onCancel={() => {
                    setShowConfirm(false);
                }}
            />
        </>
    );
});

class Sections extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            data: {},
        };
        this.loadData = this.loadData.bind(this);
        this.handleOrder = this.handleOrder.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.loadData();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onSortEnd = ({ oldIndex, newIndex }) => {
        if (oldIndex !== newIndex) {
            const { match } = this.props;
            const { id } = match.params;
            this.handleOrder(oldIndex, newIndex, id);
        }
    };

    handleError = (error) => {
        const { status } = error.response;
        if (status === 401 || status === 403) {
            const [, dispatch] = this.context;
            dispatch({
                type: 'EXIT',
            });
        }
    }

    async handleOrder(oldIndex, newIndex, id) {
        const { data } = this.state;
        const { model_section } = data;
        data.model_section = arrayMove(model_section, oldIndex, newIndex);
        this.setState({
            data,
        });

        this.setState({ loading: true });
        await orderSection({ current: oldIndex + 1, new: newIndex + 1 }, id)
            .then(() => {
                this.loadData();
            }).catch((error) => {
                this.handleError(error);
            });
        this.setState({ loading: false });
    }

    async loadData() {
        const { match } = this.props;
        const { id } = match.params;
        this.setState({ loading: true });
        await getForm(id)
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
        this.setState({ loading: false });
    }

    render() {
        const { data, loading } = this.state;
        const { match } = this.props;
        const { id } = match.params;
        const { history } = this.props;

        return (
            <>
                <TopBar>
                    <ModalView title="Crear sección de formulario" type="add" callback={this.loadData}>
                        <SectionForm form_id={parseInt(id)} />
                    </ModalView>
                </TopBar>
                <button onClick={() => { history.goBack(); }} className="back-button" type="button">
                    <i className="fas fa-long-arrow-alt-left" />
                    {' '}
                    Volver
                </button>

                {data.name && (
                    <Title text={`Secciones del formulario ${data.name}`} />
                )}

                {data.model_section && (
                    <SortableContainer
                        onSortEnd={this.onSortEnd}
                        lockAxis="y"
                        useWindowAsScrollContainer
                        useDragHandle
                        helperClass="sortable-container"
                    >
                        {data.model_section.map((item, index) => (
                            <SortableItem
                                key={item.id}
                                index={index}
                                value={item.name}
                                history={history}
                                data={item}
                                callback={this.loadData}
                                callbackError={this.handleError}
                            />
                        ))}
                    </SortableContainer>
                )}
                {loading && (
                    <div className="simple-loading-container">
                        <Spinner />
                    </div>
                )}
            </>
        );
    }
}

Sections.contextType = StateContext;

Sections.propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
};

export default withRouter(Sections);
