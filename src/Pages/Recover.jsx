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

class Recover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputEmail: '',
      textMsj: '',
      alertClass: '',
      disabledButton: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.procesar = this.procesar.bind(this);
  }

  async processInformation() {
    const dataProcesar = {};
    const { inputEmail } = this.state;
    dataProcesar.email = inputEmail;
    const responseApi = await Api.RecuperarContrasenia(dataProcesar);
    if (responseApi.result === 'success') {
      console.info('Contraseña fue recuperada coractamente');
    } else {
      this.setState({
        textMsj: 'Ocurrió un prolema al intentar recuperar contraseña',
        alertClass: 'alert-danger',
      });
    }
  }

  handleInputChange(event) {
    this.setState({ textMsj: '' });
    const { value, name } = event.target;
    this.setState({ [name]: value });
    const { email } = this.state;
    if (email !== '') {
      this.setState({ disabledButton: true });
    } else {
      this.setState({ disabledButton: false });
    }
  }

  render() {
    const {
      textMsj,
      alertClass,
      inputEmail,
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
                    <input type="text" name="email" id="email" onChange={this.handleInputChange} value={inputEmail || ''} placeholder="Email" className="form-control" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col sm={12} className="text-center">
                    {textMsj !== '' ? <Alert className={`alert ${alertClass}`}>{textMsj}</Alert> : '' }
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col sm={12} className="text-center">
                    <Button onClick={this.processInformation} className="btn-orange" disabled={disabledButton}>Enviar</Button>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col sm={12} className="text-center">
                    <Link to="/" className="link">Volver</Link>
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

export default Recover;
