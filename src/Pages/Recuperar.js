import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, FormGroup, Button, Alert} from 'reactstrap';
//import Session from './../Service/Session';
import Api from './../Service/Api';


import Logo from './../Assets/Images/Logo.png';

class Recuperar extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            txtMsj:'',
            AlertClass:'',
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.procesar = this.procesar.bind(this);
    }
    async procesar() {
        let dataProcesar = {};
        dataProcesar['email'] = this.state.email;
        let response = await Api.RecuperarContrasenia(dataProcesar);
        if(response.result === 'success'){
            if(response.perfil === 1){
                window.location.assign('/administrador/');
            }else{
                window.location.assign('/operador/');
            }
        }else{
            this.setState({
                txtMsj:"Usuario y/o contraseña incorrectos",
                AlertClass: 'alert-danger'
            });
        }
    }
    
    handleInputChange(event) { 
        this.setState({ txtMsj:"" });
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({ [name]: value });
        if(this.state.usuario && this.state.password){
            this.setState({ disabledButton:true });
        }else{
            this.setState({ disabledButton:false }); 
        }
    }
	render() {
		return (
            <>
                <Container>
                    <Row>
                        <Col  md={{ size: 6, offset: 3 }}>
                            <div className="container-login box">
                                <div className="container__logo">
                                    <img src={Logo} alt="" />
                                </div>
                                <Form>
                                    <FormGroup row>
                                        <Col sm={12}>
                                            <input type="text" name="email" id="email" onChange={this.handleInputChange} value={this.state.email || ''} placeholder="Email" className="form-control" />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col sm={12} className="text-center"> 
                                            {this.state.txtMsj !== "" ? <Alert className={'alert '+this.state.AlertClass}>{this.state.txtMsj}</Alert> : "" }
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col sm={12} className="text-center">
                                            <Button onClick={this.procesar} className="btn-orange">Enviar</Button>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col sm={12} className="text-center">
                                            <Link to='/' className="link">Volver</Link>
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </>
        )
	}
}

export default Recuperar;