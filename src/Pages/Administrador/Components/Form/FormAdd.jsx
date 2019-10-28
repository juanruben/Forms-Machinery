import React, { Component } from 'react';
import {
    Form,
} from 'reactstrap';
import Layout from '../../../../Layout/MainPrivate';

class FormAdd extends Component {
    constructor(props) {
        super(props);
        this.state = { values: [] };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    createUI() {
        return this.state.values.map((el, i) => (
            <div key={i}>
                <input type="text" value={el || ''} onChange={this.handleChange.bind(this, i)} />
                <input type="button" value="remove" onClick={this.removeClick.bind(this, i)} />
            </div>
        ));
    }

    handleChange(i, event) {
        const values = [...this.state.values];
        values[i] = event.target.value;
        this.setState({ values });
    }

    addClick() {
        this.setState((prevState) => ({ values: [...prevState.values, ''] }));
    }

    removeClick(i) {
        const values = [...this.state.values];
        values.splice(i, 1);
        this.setState({ values });
    }

    handleSubmit(event) {
        // alert(`A name was submitted: ${this.state.values.join(', ')}`);
        this.event.preventDefault();
    }

    render() {
        return (
            <Layout name="Administrador de formulario">
                <div className="container-white">
                    <Form onSubmit={this.handleSubmit}>
                        {this.createUI()}
                        <input type="button" value="add more" onClick={this.addClick.bind(this)} className="btn-orange" />
                        <input type="submit" value="Submit" className="btn-orange" />
                    </Form>
                </div>
            </Layout>
        );
    }
}

export default FormAdd;
