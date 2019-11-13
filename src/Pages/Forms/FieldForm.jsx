import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';

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
                <Input label="Tipo" placeholder="Seleccione..." />
                <div>Requerido <input type="checkbox" /></div>
                <div>Observaciones <input type="checkbox" /></div>
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