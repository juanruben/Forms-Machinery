/* eslint-disable camelcase */
import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import SweetAlert from 'react-bootstrap-sweetalert';
import { withRouter } from 'react-router-dom';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { Spinner } from 'reactstrap';
import { StateContext } from '../../State';
import SectionForm from './SectionForm';
import ModalView from '../../Layout/ModalView/ModalView';
import Title from '../../Components/Title/Title';
import TopBar from '../../Components/TopBar/TopBar';
import {
    getForm, orderSection, deleteSection, copySection,
} from '../../Service/Api';

import './sortable.scss';

const SortableContainer = sortableContainer(({ children }) => <ul className="sortable-container">{children}</ul>);

const DragHandle = sortableHandle(() => <span className="drag-handle"><i className="fas fa-grip-horizontal" /></span>);

const SortableItem = sortableElement(({
    value, history, data, callback,
}) => {
    const [showConfirm, setShowConfirm] = useState(false);

    const onViewClick = () => {
        history.push(`/admin/formularios/secciones/${data.id}`);
    };

    async function handleRemove() {
        await deleteSection(data.id)
            .then(() => {
                callback();
            }).catch(() => {
            });
    }

    async function handleCopy() {
        await copySection(data.id)
            .then(() => {
                callback();
            }).catch(() => {
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

            <SweetAlert
                show={showConfirm}
                warning
                showCancel
                confirmBtnText="Sí, estoy seguro"
                cancelBtnText="No, Cancelar"
                confirmBtnBsStyle="danger"
                cancelBtnBsStyle="default"
                title="Eliminar sección"
                onConfirm={() => {
                    handleRemove();
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

class Sections extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
        };
        this.loadData = this.loadData.bind(this);
        this.handleOrder = this.handleOrder.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    onSortEnd = ({ oldIndex, newIndex }) => {
        const { match } = this.props;
        const { id } = match.params;
        this.handleOrder(oldIndex, newIndex, id);
    };

    async handleOrder(oldIndex, newIndex, id) {
        const { data } = this.state;
        const { model_section } = data;
        data.model_section = arrayMove(model_section, oldIndex, newIndex);
        this.setState({
            data,
        });

        const [, dispatch] = this.context;
        this.setState({ loading: true });
        await orderSection({ current: oldIndex + 1, new: newIndex + 1 }, id)
            .then(() => {
                this.loadData();
            }).catch((error) => {
                if (error.response.status === 403 || error.response.status === 401) {
                    dispatch({
                        type: 'EXIT',
                    });
                }
            });
        this.setState({ loading: false });
    }

    async loadData() {
        const { match } = this.props;
        const { id } = match.params;
        const [, dispatch] = this.context;
        this.setState({ loading: true });
        await getForm(id)
            .then((response) => {
                this.setState({
                    data: response.data,
                    loading: false,
                });
            }).catch((error) => {
                if (error.response.status === 403 || error.response.status === 401) {
                    dispatch({
                        type: 'EXIT',
                    });
                }
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
                            />
                        ))}
                    </SortableContainer>
                )}
                {loading && <Spinner />}
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
