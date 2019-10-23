import React, { Component } from 'react';
import { Container, Row, Col, Form, FormGroup, Button, Alert} from 'reactstrap';


//import Logo from './../Assets/Images/Logo.png';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            usuario: '',
            password: '',
            txtMsj:'',
            AlertClass:'',
        }
    }
	render() {
		return (
            <>
                <Container>
                    <Row>
                        <Col>
                            <div className="content-logo">
                                {/*<img src={Logo} alt="" />*/}
                            </div>
                        </Col>
                    </Row>
                    <Form>
                    
                        <FormGroup row>
                            <Col sm={12}>
                                <input type="text" name="usuario" id="usuario" onChange={this.handleInputChange} value={this.state.usuario || ''} placeholder="Usuario" className="form-control" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={12}>
                                <input type="password" name="password" id="password" onChange={this.handleInputChange} value={this.state.password || ''} placeholder="Password" className="form-control" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={12} className="text-center"> 
                                {this.state.txtMsj !== "" ? <Alert className={'alert '+this.state.AlertClass}>{this.state.txtMsj}</Alert> : "" }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={12} className="text-center">
                                <Button onClick={this.setForm} disabled={!this.state.disabledButton} className="btn-orange">Ingresar</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Container>
            </>
        )
	}
}

export default Login;