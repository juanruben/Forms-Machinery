import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Button,
  Alert,
} from 'reactstrap';
import Api from '../Service/Api';
import Logo from '../Assets/images/Logo.png';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: '',
      password: '',
      msj: '',
      alertclass: '',
      disabledbutton: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.procesar = this.procesar.bind(this);
  }

  async procesar() {
    const { usuario, password } = this.state;
    const dataProcesar = {
      usuario,
      password,
    };
    const response = await Api.Login(dataProcesar);

    if (response.result === 'success') {
      if (response.perfil === 1) {
        window.location.assign('/administrador/');
      } else {
        window.location.assign('/operador/');
      }
    } else {
      this.setState({
        msj: 'Usuario y/o contraseña incorrectos',
        alertclass: 'alert-danger',
      });
    }
  }

  handleInputChange(event) {
    this.setState({ msj: '' });
    const { target } = event;
    const { value } = target;
    const { name } = target;
    this.setState({ [name]: value });
    const { usuario, password } = this.state;
    if (usuario !== '' && password !== '') {
      this.setState({ disabledbutton: true });
    } else {
      this.setState({ disabledbutton: false });
    }
  }

  render() {
    const {
      usuario,
      password,
      msj,
      alertclass,
      disabledbutton,
    } = this.state;

    return (
      <Container>
        <Row>
          <Col md={{ size: 6, offset: 3 }}>
            <div className="container-login box">
              <div className="container__logo">
                <img src={Logo} alt="" />
              </div>
              <Form>
                <FormGroup row>
                  <Col sm={12}>
                    <input type="text" name="usuario" id="usuario" onChange={this.handleInputChange} value={usuario || ''} placeholder="Usuario" className="form-control" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col sm={12}>
                    <input type="password" name="password" id="password" onChange={this.handleInputChange} value={password || ''} placeholder="Password" className="form-control" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col sm={12} className="text-center">
                    {msj !== '' ? <Alert className={`alert ${alertclass}`}>{msj}</Alert> : '' }
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col sm={12} className="text-center">
                    <Button onClick={this.procesar} className="btn-orange" disabled={disabledbutton}>Entrar</Button>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col sm={12} className="text-center">
                    <Link to="/recuperar" className="link">Olvidó su contraseña</Link>
                  </Col>
                </FormGroup>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default Login;
