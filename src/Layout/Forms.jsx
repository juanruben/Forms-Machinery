import React, { Component } from 'react';
import {
    Row, Form,
} from 'reactstrap';

import TagInput from './TagInput';

const useForm = ({ initialValues, onSubmit, validate }) => {
    const [values, setValues] = React.useState(initialValues || {});
    const [touchedValues, setTouchedValues] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const handleChange = (event) => {
        const { target } = event;
        console.info(event);
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const { name } = target;
        setValues({
            ...values,
            [name]: value,
        });
    };
    const handleBlur = (event) => {
        const { target } = event;
        const { name } = target;
        setTouchedValues({
            ...touchedValues,
            [name]: true,
        });
        const e = validate(values);
        setErrors({
            ...errors,
            ...e,
        });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const e = validate(values);
        setErrors({
            ...errors,
            ...e,
        });
        onSubmit({ values, e });
    };
    return {
        values,
        touchedValues,
        errors,
        handleChange,
        handleSubmit,
        handleBlur,
    };
};

class Forms extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { items } = this.props;
        return (
            <Form onSubmit={this.handleSubmit}>
                <Row form>
                    <TagInput items={items} handleChange={this.handleChange} />
                </Row>
            </Form>
        );
    }
}

export default Forms;
