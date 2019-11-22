import React, { Component, useState } from 'react';
import { Spinner } from 'reactstrap';
import { StateContext } from '../../State';
import { withRouter } from 'react-router-dom';
import { getFields, deleteField, copyField, orderField } from '../../Service/Api';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import PropTypes from 'prop-types';
import arrayMove from 'array-move';
import FieldForm from './FieldForm';
import SweetAlert from 'react-bootstrap-sweetalert';
import ModalView from '../../Layout/ModalView/ModalView';
import Title from '../../Components/Title/Title';
import TopBar from '../../Components/TopBar/TopBar';


import image from './assets/image.png';
import text from './assets/text.png';
import simple from './assets/simple.png';
import multiple from './assets/multiple.png';
import './sortable.scss';

const SortableContainer = sortableContainer(({ children }) => <ul className="sortable-container">{children}</ul>);

const DragHandle = sortableHandle(() => <span className="drag-handle"><i className="fas fa-grip-horizontal" /></span>);

const SortableItem = sortableElement(({ index, value, type, data, callback, loading }) => {
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

    //Delete Field Function
    async function handleRemove() {
        loading(true);
        await deleteField(data.id)
            .then(() => {
                callback();
            }).catch(() => {
            });
    }

    //Copy Field Function
    async function handleCopy() {
        loading(true);
        await copyField(data.id)
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
                    <img src={getIcon(type)} alt="" style={{ width: '25px' }} />
                    <button className="link-button" disabled type="button">
                        {value}
                    </button>
                </span>
                <div className="form-actions">
                    <button type="button" onClick={handleCopy}>
                        <i className="far fa-copy" />
                    </button>
                    <ModalView title="Editar campo" type="edit" callback={callback}>
                        <FieldForm data={data} section_id={data.model_section_id} />
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

class Fields extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            data: {},
        };
        this.loadData = this.loadData.bind(this);
        this.toogleLoading = this.toogleLoading.bind(this);
    }

    componentDidMount(){
        this.loadData();
    }

    //Load fields by Section Id
    async loadData(){
        const { match } = this.props;
        const { id } = match.params;
        const [, dispatch] = this.context;
        this.setState({ loading: true });
        await getFields(id)
            .then((response) => {                
                this.setState({
                    items: response.data.model_field,
                    data: response.data
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


    toogleLoading(value){
        this.setState({
            loading: value
        });
    }


    onSortEnd = ({ oldIndex, newIndex }) => {

        const { match } = this.props;
        const { id } = match.params;

        this.handleOrder(oldIndex, newIndex, id);

        this.setState(({ items }) => ({
            items: arrayMove(items, oldIndex, newIndex),
        }));
    };

    async handleOrder(current, newIndex, id){
        let data = {
            current : current + 1,
            new : newIndex + 1,
        };

        console.log("[ORDER]", data);
        console.log("[ID SECCION]", id);

        this.setState({loading : true});

        await orderField(data, id)
            .then((value) => {
                console.log(value)
                // this.loadData(); 
            }).catch((value) => {
                console.log(value)
            });

        this.setState({loading : false});

    }

    render() {
        const { items, loading, data } = this.state;
        const { history, match } = this.props;
        const { id } = match.params;        

        return (
            <>
                <TopBar>
                    <ModalView title="Crear campo" type="add" callback={this.loadData}>
                        <FieldForm section_id={parseInt(id)} />
                    </ModalView>
                </TopBar>
                <button onClick={() => { history.goBack(); }} className="back-button" type="button">
                    <i className="fas fa-long-arrow-alt-left" />
                    {' '}
                    Volver
                </button>
                
                {data.name && (   
                    <>
                        <Title text={"Campos de la sección " + data.name } />                 
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
                                    data={item}
                                    callback={this.loadData}
                                    loading={this.toogleLoading}                                    
                                />
                            ))}
                        </SortableContainer>
                    </>
                )}
                {loading && <Spinner />} 
            </>
            
        );
    }
}

Fields.contextType = StateContext;

Fields.propTypes = {
    history: PropTypes.object.isRequired,
};

export default withRouter(Fields);
