import React, { Component } from 'react';
// import { Col, Row, Button, Form, FormGroup, Input,} from 'reactstrap';
import Layout from '../../../../Layout/MainPrivate';

import Formulario from '../../../../Layout/Forms';


const items = [
    {
        placeholders: 'Nombre',
        name: 'nombre',
        type: 'text',
        tagType: 'input',
        validate: true,
        space: 6,
    },
    {
        placeholders: 'Apellido',
        name: 'apellido',
        type: 'text',
        tagType: 'input',
        validate: true,
        space: 6,
    },
    {
        placeholders: 'Apellido',
        name: 'apellido',
        type: 'text',
        tagType: 'input',
        validate: true,
        space: 12,
    },
    {
        placeholders: 'Apellido',
        name: 'apellido',
        type: 'select',
        tagType: 'select',
        validate: true,
        space: 12,
        values: [
            'option 1',
            'option 2',
        ],
    },
    {
        placeholders: 'Crear',
        name: 'btn-crear',
        type: 'button',
        tagType: 'button',
        validate: true,
        space: 4,
    },
];

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
                    <Formulario items={items} />
                </div>
            </Layout>
        );
    }
}

export default ClientAdd;
