import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
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
        
        this.validationRules();

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
                dataForm.options = ['Yes','No'];
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
                dataForm.type = "image";
                dataForm.options = null;
        }  

        console.log(dataForm)
        
        await addField(dataForm, section_id)
            .then((value) => {
                console.log(value);
            }).catch((value) => {
                console.log(value)
            })
        
        
    }    

    handleUpdate(){
        const { data } = this.state;  
        console.log(data)      
    }

    handleOptions(){
        
        const { data, opciones } = this.state;

        data['options'].push(opciones);        

        this.setState({
            data,
            opciones:""
        });
        
    }

    handleDelete(event){
        const { data, opciones } = this.state;

        data['options'].splice(event.target.value,1);        

        this.setState({
            data,
            opciones:""
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
            errors.name = "Required"            
        }

        if(!type){
            formIsValid = false;
            errors.type = "Required"
        }

        this.setState({
            errors,
        });

        return formIsValid;
    }

    render() {

        const {
            createMode, errors, data, opciones
        } = this.state;
        const { name, type, required, comments } = data;

        return (
            <>
                <Input label="Nombre" name="name" placeholder="Nombre" onChange={this.onChange} value={name} errors={errors} required/>
                <Select label="Tipo" name="type" options={types} placeholder="Seleccione..." onChange={this.onChange} value={type} errors={errors} required/>

                {data.type === "3" ? (
                    
                    <Row>
                        <Col md={8}>
                            <Input label="Opciones" name="opciones" placeholder="Opciones" onChange={this.onChange} value={opciones} />
                            
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
                    <Col md={8} />
                    <Col md={4}>
                        <Button text={createMode ? 'Crear' : 'Actualizar'} onClick={createMode ? this.handleCreate : this.handleUpdate} />
                    </Col>
                </Row>
            </>
        );
    }
}

export default FieldForm;
