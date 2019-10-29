import React, { Component } from 'react';
import {
    Row, Form,
} from 'reactstrap';

import TagInput from './TagInput';

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

class Forms extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Form>
                <Row form>
                    <TagInput items={items} />
                </Row>
            </Form>
        );
    }
}

export default Forms;
