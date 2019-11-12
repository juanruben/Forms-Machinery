import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';

class NewForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <>
                <Input placeholder="Nombre empresa" />
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

export default NewForm;
