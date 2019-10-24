import React, { Component } from 'react';
import {
  Col, Row, Button, Form, FormGroup, Input,
} from 'reactstrap';
import Layout from '../../../Layout/MainPrivate';

class ClienteAgregar extends Component {
  render() {
    return (
      <Layout name="Crear cliente">
        <h3 className="title-container">Agregar usuario</h3>
        <div className="container-white">
          <Form>
            <Row form>
              <Col md={6}>
                <p>Agrega los datos solicitados</p>
              </Col>
              <Col md={6}>
                <p />
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Input type="text" name="nombre" id="nombre" placeholder="Nombre" />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Input type="text" name="rut" id="rut" placeholder="RUT" />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Input type="number" name="telefono" id="telefono" placeholder="Teléfono" />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Input type="email" name="email" id="email" placeholder="Email" />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={12}>
                <FormGroup>
                  <Input type="select" name="perfil" id="perfil">
                    <option>Administrador</option>
                    <option>OPerario</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Input type="password" name="password" id="password" placeholder="Contraseña" />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Input type="password" name="passwordR" id="passwordR" placeholder="Repita Contraseña" />
                </FormGroup>
              </Col>
            </Row>
            <Button className="btn-orange">Crear</Button>
          </Form>
        </div>
      </Layout>
    );
  }
}
export default ClienteAgregar;
