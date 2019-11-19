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
        name: 'Múltiples opciones',
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
                <Input label="Nombre" name="name" placeholder="Nombre" onChange={() => { }} />
                <Select label="Tipo" name="type" options={types} placeholder="Seleccione..." onChange={() => { }} />
                <Simple label="Requerido" name="required" onChange={() => { }} />
                <Simple label="Observaciones" name="notes" onChange={() => { }} />
                <Row>
                    <Col md={8} />
                    <Col md={4}>
                        <Button text="Crear" onClick={() => { }} />
                    </Col>
                </Row>
            </>
        );
    }
}

export default FieldForm;
