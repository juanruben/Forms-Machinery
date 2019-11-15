import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import Select from '../../Components/Select/Select';

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
                <div>
                    <input type="checkbox" />
                    {' '}
                    Requerido
                </div>
                <div>
                    <input type="checkbox" />
                    {' '}
                    Observaciones
                </div>
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
