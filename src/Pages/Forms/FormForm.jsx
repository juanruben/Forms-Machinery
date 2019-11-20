import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'reactstrap';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import { addForm, updateForm } from '../../Service/Api';

class NewForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createMode: true,
            data: {},
            errors: {},
        };
        this.handleCreate = this.handleCreate.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.onChange = this.onChange.bind(this);
        this.validForm = this.validForm.bind(this);
    }

    componentDidMount() {
        const { data } = this.props;
        if (data) {
            this.setState({
                data,
                createMode: false,
            });
        }
    }

    onChange(event) {
        const { name, value } = event.target;
        const { data, errors } = this.state;
        data[name] = value;
        errors[name] = '';
        this.setState({
            data,
            errors,
        });
    }

    validForm() {
        const { data } = this.state;
        const { name } = data;
        const errors = {};
        let formIsValid = true;

        if (!name || name.trim().length === 0) {
            formIsValid = false;
            errors.name = 'Requerido';
        }

        this.setState({
            errors,
        });

        return formIsValid;
    }

    async handleCreate() {
        if (this.validForm()) {
            this.toggleLoading(true);
            const { data } = this.state;

            await addForm(data).then((response) => {
                if (response && response.status === 201) {
                    const { callback } = this.props;
                    callback();
                }
            }).catch((error) => {
                this.setState({
                    errors: error.response.data.errors,
                });
            });

            this.toggleLoading(false);
        }
    }

    async handleUpdate() {
        if (this.validForm()) {
            this.toggleLoading(true);
            const { data } = this.state;

            await updateForm(data).then((response) => {
                if (response && response.status === 200) {
                    const { callback } = this.props;
                    callback();
                }
            }).catch((error) => {
                this.setState({
                    errors: error.response.data.errors,
                });
            });
            this.toggleLoading(false);
        }
    }

    toggleLoading(value) {
        this.setState({
            loading: value,
        });
    }

    render() {
        const {
            createMode, errors, data, loading,
        } = this.state;
        const { name } = data;

        return (
            <>
                <Input name="name" onChange={this.onChange} label="Nombre" placeholder="Nombre de formulario" value={name} errors={errors} required />
                <div className="form-footer">
                    {loading && <div className="spinner"><Spinner /></div>}
                    <Button text={createMode ? 'Crear' : 'Actualizar'} onClick={createMode ? this.handleCreate : this.handleUpdate} />
                </div>
            </>
        );
    }
}

NewForm.propTypes = {
    callback: PropTypes.func,
    data: PropTypes.object,
};

NewForm.defaultProps = {
    callback: null,
    data: null,
};


export default NewForm;
