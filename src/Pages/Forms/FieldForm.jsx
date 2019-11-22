import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Spinner } from 'reactstrap';
import PropTypes from 'prop-types';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import Select from '../../Components/Select/Select';
import Simple from '../../Components/Simple/Simple';
import ItemOption from '../../Components/ItemOption/ItemOption';
import { addField, updateField } from '../../Service/Api';

const types = [
    {
        id: 1,
        name: 'Texto',
    },
    {
        id: 2,
        name: 'Check',
    },
    {
        id: 3,
        name: 'Múltiples opciones',
    },
    {
        id: 4,
        name: 'Imagen',
    },
];

class FieldForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createMode: true,
            data: {
                options: []
            },
            errors: {},
            opciones: "",            
        };
        this.onChange = this.onChange.bind(this);
        this.onChangeBoolean = this.onChangeBoolean.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleOptions = this.handleOptions.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        const { data } = this.props;
        if (data) {

            switch(data.type){
                case "text":
                    data.type = "1";
                    data.options = [];
                    break;
                case "simple":
                    data.type = "2";                                        
                    break;
                case "multiple":
                    data.type = "3";
                    break;
                case "image":
                    data.type = "4";  
                    data.options = [];              
                    break;
                default:
                    data.type = "1";                    
            }

            this.setState({
                data,
                createMode: false,                
            });
        }
    }

    //On Actions

    onChange(event) {
        const { name, value } = event.target;
        const { data, errors } = this.state;   
        let { opciones } = this.state;             
        if(name === 'opciones'){
            opciones = value
        }else{
            data[name] = value;        
        }
        
        errors[name] = '';
        this.setState({
            data,
            errors,
            opciones
        });
    }

    onChangeBoolean(event) {
        const { name, checked } = event.target;
        const { data, errors } = this.state;                
        data[name] = checked;        
        errors[name] = '';
        this.setState({
            data,
            errors,
        });
    }

    //Handlers
    async handleCreate(){

        const { data } = this.state;
        const { section_id } = this.props;
        
        if(this.validationRules()){

            let dataForm = {
                name : data.name,
                required: data.required ? 1 : 0,            
                comments: data.comments ? 1 : 0,            
            };
    
            switch(data.type){
                case "1":
                    dataForm.type = "text";                
                    break;
                case "2":
                    dataForm.type = "simple";
                    dataForm.options = ['Si','No'];
                    data.options = dataForm.options;
                    break;
                case "3":
                    dataForm.type = "multiple";
                    dataForm.options = data.options;
                    break;
                case "4":
                    dataForm.type = "image";                
                    break;
                default:
                    dataForm.type = "text";
                    
            }  
            
            this.toggleLoading(true);
            
            await addField(dataForm, section_id)
                .then((value) => {                    
                    const { callback } = this.props;
                    callback();
                }).catch((error) => {
                    
                })

            this.toggleLoading(false);
        }      
        
        
    }    

    async handleUpdate(){
        const { data } = this.state;  
        
        if(this.validationRules()){

            let dataForm = {
                name : data.name,
                required: data.required ? 1 : 0,            
                comments: data.comments ? 1 : 0,            
            };
    
            switch(data.type){
                case "1":
                    dataForm.type = "text";                
                    break;
                case "2":
                    dataForm.type = "simple";
                    dataForm.options = ['Si','No'];
                    data.options = dataForm.options;
                    break;
                case "3":
                    dataForm.type = "multiple";
                    dataForm.options = data.options;
                    break;
                case "4":
                    dataForm.type = "image";                
                    break;
                default:
                    dataForm.type = "text";
                    
            }  
            
            this.toggleLoading(true);
            
            await updateField(dataForm, data.id)
                .then((value) => {                    
                    const { callback } = this.props;
                    callback();
                }).catch((error) => {
                    
                })

            this.toggleLoading(false);
        }
    }

    handleOptions(){
        
        const { data, opciones } = this.state;
        const errors = {};
        if(opciones.trim().length === 0){
            errors.opciones = "Requerido"
        }else{
            data['options'].push(opciones);
        }
                

        this.setState({
            data,
            errors,
            opciones:""
        });
        
    }

    handleDelete(event){
        const { data } = this.state;

        data['options'].splice(event.target.value,1);        

        this.setState({
            data,
            opciones:""
        });
        
    }

    //Toggle functions

    toggleLoading(value) {
        this.setState({
            loading: value,
        });
    }

    //Validations

    validationRules(){

        const { data } = this.state;
        const { name, type } = data;
        const errors = {};
        let formIsValid = true;

        if(!name || name.trim().length === 0){
            formIsValid = false;
            errors.name = "Requerido"            
        }

        if(!type){
            formIsValid = false;
            errors.type = "Requerido"
        }

        if(data.type === '3'){
            if( data.options.length <= 1 ) {
                formIsValid = false;
                errors.opciones = "Requerido al menos 2 opciónes"
            }
        }

        this.setState({
            errors,
        });

        return formIsValid;
    }

    render() {

        const {
            createMode, errors, data, opciones, loading
        } = this.state;
        const { name, type, required, comments } = data;

        return (
            <>
                <Input label="Nombre" name="name" placeholder="Nombre" onChange={this.onChange} value={name} errors={errors} required/>
                <Select label="Tipo" name="type" options={types} placeholder="Seleccione..." onChange={this.onChange} value={type} errors={errors} required/>

                {data.type === "3" ? (
                    
                    <Row>
                        <Col md={8}>
                            <Input label="Opciones" name="opciones" placeholder="Opciones" onChange={this.onChange} value={opciones} errors={errors} required />
                            
                            {data.options.map((item, index) => (
                                <ItemOption text={item} onClick={this.handleDelete} value={index} key={index}></ItemOption>
                            ))}

                        </Col>    
                        <Col md={4}>
                            <Button text='Agregar' onClick={this.handleOptions} className="align-btn"/>
                        </Col>
                    </Row>                    
                
                ) : ("")}                

                <Simple label="Requerido" name="required" onChange={this.onChangeBoolean} value={required} />

                <Simple label="Observaciones" name="comments" onChange={this.onChangeBoolean} value={comments} />

                <Row>
                    <Col md={8} style={{textAlign : 'right'}}>{loading && <div className="spinner"><Spinner /></div>}</Col>
                    <Col md={4}>                        
                        <Button text={createMode ? 'Crear' : 'Actualizar'} onClick={createMode ? this.handleCreate : this.handleUpdate} />
                    </Col>
                </Row>
            </>
        );
    }
}

FieldForm.propTypes = {
    callback: PropTypes.func,
    data: PropTypes.object,
    section_id: PropTypes.number.isRequired,
};

FieldForm.defaultProps = {
    callback: null,
    data: null,
};

export default FieldForm;
