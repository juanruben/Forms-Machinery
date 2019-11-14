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
                Tipo
                <select name="" id="" className="select-icafal" defaultValue="0">
                    <option value="0" disabled>Seleccione...</option>
                    <option value="1">Texto</option>
                    <option value="2">Check</option>
                    <option value="3">Selección múltiple</option>
                    <option value="4">Imágen</option>
                </select>
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
