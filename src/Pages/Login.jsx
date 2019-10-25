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
      inputUsuario: '',
      inputPassword: '',
      textMsj: '',
      alertClass: '',
      disabledButton: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.procesar = this.procesar.bind(this);
  }

  async processInformation() {
    const { inputUsuario, inputPassword } = this.state;
    const dataProcesar = {
      inputUsuario,
      inputPassword,
    };
    const responseApi = await Api.Login(dataProcesar);

    if (responseApi.result === 'success') {
      if (responseApi.perfil === 1) {
        window.location.assign('/administrador/');
      } else {
        window.location.assign('/operador/');
      }
    } else {
      this.setState({
        textMsj: 'Usuario y/o contraseña incorrectos',
        alertClass: 'alert-danger',
      });
    }
  }

  handleInputChange(event) {
    this.setState({ textMsj: '' });
    const { target } = event;
    const { value } = target;
    const { name } = target;
    this.setState({ [name]: value });
    const { inputUsuario, inputPassword } = this.state;
    if (inputUsuario !== '' && inputPassword !== '') {
      this.setState({ disabledButton: true });
    } else {
      this.setState({ disabledButton: false });
    }
  }

  render() {
    const {
      inputUsuario,
      inputPassword,
      textMsj,
      alertClass,
      disabledButton,
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
                    <input type="text" name="usuario" id="usuario" onChange={this.handleInputChange} value={inputUsuario || ''} placeholder="Usuario" className="form-control" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col sm={12}>
                    <input type="password" name="password" id="password" onChange={this.handleInputChange} value={inputPassword || ''} placeholder="Password" className="form-control" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col sm={12} className="text-center">
                    {textMsj !== '' ? <Alert className={`alert ${alertClass}`}>{textMsj}</Alert> : '' }
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col sm={12} className="text-center">
                    <Button onClick={this.processInformation} className="btn-orange" disabled={disabledButton}>Entrar</Button>
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
