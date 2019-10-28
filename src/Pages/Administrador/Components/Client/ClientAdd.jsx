import React, { Component } from 'react';
import {
    Col, Row, Button, Form, FormGroup, Input,
} from 'reactstrap';
import Layout from '../../../../Layout/MainPrivate';

class ClientAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Layout name="Administrador de clientes">
                <h3 className="title-container">Agregar Cliente</h3>
                <div className="container-white">
                    <Form>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Input type="text" name="nombre" id="nombre" placeholder="Nombre empresa" />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Input type="text" name="razonsocial" id="razonsocial" placeholder="Razón Social" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Input type="text" name="rut" id="rut" placeholder="RUT empresa" />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Input type="number" name="telefono" id="telefono" placeholder="Teléfono de contacto" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Input type="email" name="email" id="email" placeholder="Email" />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Input type="text" name="direccion" id="direccion" placeholder="Dirección" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row form>
                            <Col md={{ size: 6, offset: 6 }} className="text-left">
                                <FormGroup>
                                    <p>
                                        Este correo recibirá reporte y estado de la maquinaria
                                        cuando esta salga del taller hacia obra de cliente
                                    </p>
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

export default ClientAdd;
