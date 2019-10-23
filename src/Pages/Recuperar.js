import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Container, Row, Col, Form, FormGroup, Button, Alert} from 'reactstrap';


import Logo from './../Assets/Images/Logo.png';

class Recuperar extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            txtMsj:'',
            AlertClass:'',
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
                                            <Button onClick={this.setForm} className="btn-orange">Enviar</Button>
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