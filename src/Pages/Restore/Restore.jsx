import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import { StateContext } from '../../State';
import { validatePassword } from '../../Service/Utils';
import LayoutFullWidth from '../../Layout/LayoutFullWidth/LayoutFullWidth';
import Box from '../../Layout/Box/Box';
import Logo from '../../Components/Logo/Logo';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import { restore } from '../../Service/Api';
import './Restore.scss';

class Restore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            token: '',
            errors: {},
            showAlertError: false,
            alertMessage: '',
            sent: false,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.validForm = this.validForm.bind(this);
        this.send = this.send.bind(this);
    }

    componentDidMount() {
        const { location } = this.props;
        const { search } = location;
        this.setState({
            token: new URLSearchParams(search).get('token'),
        }, () => {
            console.log("ESTE ES EL TOKEN -----> ", this.state.token);
        });
    }

    validForm() {
        const { password, passwordRepeat } = this.state.data;
        const errors = {};
        let formIsValid = true;

        if (!validatePassword(password)) {
            formIsValid = false;
            errors.password = ['Error de formato de password'];
        }

        if (!validatePassword(passwordRepeat)) {
            formIsValid = false;
            errors.passwordRepeat = ['Error de formato de password Repeat'];
        }
        if (password !== passwordRepeat) {
            formIsValid = false;
            errors.passwordRepeat = ['Error Password no coinciden'];
        }
        this.setState({
            errors,
        });

        return formIsValid;
    }

    toggleLoading(value) {
        const [, dispatch] = this.context;
        dispatch({
            type: 'SET_LOADING',
            value,
        });
    }

    async send() {
        if (this.validForm()) {
            this.toggleLoading(true);
            const { data, token } = this.state;
            data.token = token;
            await restore(data).then((response) => {
                if (response && response.status === 200) {
                    this.setState({
                        data: '',
                        sent: true,
                    });
                } else {
                    this.setState({
                        showAlertError: true,
                        alertMessage: 'Error de conexión',
                    });
                }
            }).catch(() => {
                this.setState({
                    showAlertError: true,
                    alertMessage: 'No fue posible reestablecer las contraseñas',
                });
            });
            this.toggleLoading(false);
        }
    }

    handleInputChange(event) {
        const { name, value } = event.target;
        const { data, errors } = this.state;
        data[name] = value;
        errors[name] = '';
        this.setState({
            data,
            errors,
        });
    }

    render() {
        const {
            errors,
            showAlertError,
            alertMessage,
            sent,
        } = this.state;
        const {
            password,
            passwordRepeat,
        } = this.state.data;

        return (
            <LayoutFullWidth>
                <Box>
                    <Logo padding={30} maxWidth={150} />
                    <div className="login-container">
                        <Input type="password" name="password" onChange={this.handleInputChange} value={password} icon="fas fa-unlock-alt" placeholder="Contraseña" errors={errors} />
                        <Input type="password" name="passwordRepeat" onChange={this.handleInputChange} value={passwordRepeat} icon="fas fa-unlock-alt" placeholder="Repita contraseña" errors={errors} />
                        <Button type="button" onClick={this.send} text="Enviar" />
                    </div>
                    <Link to="/login" className="link-login">Volver</Link>
                </Box>
                <SweetAlert
                    title=""
                    show={showAlertError}
                    error
                    onConfirm={() => {
                        this.setState({
                            showAlertError: false,
                        });
                    }}
                >
                    {alertMessage}
                </SweetAlert>
                {sent && <div className="message-ok">Contraseña actualizada</div>}
            </LayoutFullWidth>
        );
    }
}

Restore.propTypes = {
    location: PropTypes.object.isRequired,
};

Restore.contextType = StateContext;

export default withRouter(Restore);
