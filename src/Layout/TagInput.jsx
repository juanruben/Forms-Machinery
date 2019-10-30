import React, { Component } from 'react';
import {
    Col,
    FormGroup,
    Input,
    Button,
}
    from 'reactstrap';

class Forms extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { items, handleChange } = this.props;
        return (
            <>
                {items.map((item) => (
                    <Col md={item.space}>
                        <FormGroup>
                            {item.tagType === 'input' ? (
                                <Input
                                    type={item.type}
                                    id={item.name}
                                    name={item.name}
                                    placeholder={item.placeholders}
                                    onChange={handleChange}
                                />
                            ) : ''}
                            {item.tagType === 'select' ? (
                                <select
                                    id={item.name}
                                    name={item.name}
                                    className="form-control"
                                    onChange={handleChange}
                                >
                                    {item.values.map((option) => (
                                        <option value={option}>{option}</option>
                                    ))}
                                </select>
                            ) : ''}
                            {item.tagType === 'button' ? (
                                <Button
                                    name={item.name}
                                    id={item.name}
                                    className="btn-orange"
                                    type="submit"
                                >
                                    {item.placeholders}
                                </Button>
                            ) : ''}

                        </FormGroup>
                    </Col>
                ))}
            </>
        );
    }
}

export default Forms;
