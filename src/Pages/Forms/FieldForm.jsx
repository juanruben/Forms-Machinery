import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import Select from '../../Components/Select/Select';
import Simple from '../../Components/Simple/Simple';

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
        name: 'Selección múltiple',
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
        };
    }

    render() {
        return (
            <>
                <Input label="Nombre" placeholder="Nombre" />
                <Select label="Tipo" options={types} placeholder="Seleccione..." name="name" onChange={() => { }} />
                <Simple label="Requerido" name="name" onChange={() => { }} />
                <Simple label="Observaciones" name="name2" onChange={() => { }} />
                <Row>
                    <Col md={8} />
                    <Col md={4}>
                        <Button text="Crear" />
                    </Col>
                </Row>
            </>
        );
    }
}

export default FieldForm;
