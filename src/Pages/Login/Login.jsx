import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { StateContext } from '../../State';
import { validateUsername, validatePassword } from '../../Service/Utils';
import LayoutFullWidth from '../../Layout/LayoutFullWidth/LayoutFullWidth';
import Box from '../../Layout/Box/Box';
import Logo from '../../Components/Logo/Logo';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import { AlertDialog } from '../../Components/Dialog/Dialog';
import { login } from '../../Service/Api';
import './Login.scss';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            errors: {},
            showAlertError: false,
            alertMessage: '',
        };
        this.onChange = this.onChange.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.validForm = this.validForm.bind(this);
        this.checkLoggedIn = this.checkLoggedIn.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
        this.requestSignIn = this.requestSignIn.bind(this);
        this.signIn = this.signIn.bind(this);
    }

    componentDidMount() {
        this.checkLoggedIn();
        document.title = 'Forms Machinery';
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

    onKeyPress(event) {
        if (event.key === 'Enter') {
            this.handleSignIn();
        }
    }

    checkLoggedIn() {
        const [, dispatch] = this.context;
        dispatch({
            type: 'LOAD_SESSION',
        });
    }

    validForm() {
        const { data } = this.state;
        const { user, password } = data;
        const errors = {};
        let formIsValid = true;

        if (!user || user.trim().length === 0) {
            formIsValid = false;
            errors.user = ['Requerido'];
        } else if (!validateUsername(user)) {
            formIsValid = false;
            errors.user = ['Error de formato'];
        }

        if (!password || password.trim().length === 0) {
            formIsValid = false;
            errors.password = ['Requerido'];
        } else if (!validatePassword(password)) {
            formIsValid = false;
            errors.password = ['Debe tener al menos: 1 mayúscula, 1 minúscula, 1 número'];
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

    async requestSignIn() {
        const { data } = this.state;

        await login(data).then((response) => {
            if (response && response.status === 200) {
                const { token, role } = response.data;
                this.signIn(token, role);
            } else {
                this.setState({
                    showAlertError: true,
                    alertMessage: 'Error de conexión',
                });
            }
        }).catch(() => {
            this.setState({
                showAlertError: true,
                alertMessage: 'Datos incorrectos',
            });
        });
        this.toggleLoading(false);
    }

    signIn(token, role) {
        const [, dispatch] = this.context;
        dispatch({
            type: 'SIGN_IN',
            value: { token, role },
        });
    }

    handleSignIn() {
        if (this.validForm()) {
            this.toggleLoading(true);
            this.requestSignIn();
        }
    }

    render() {
        const [{ loggedin, role }] = this.context;
        const {
            showAlertError, alertMessage, errors, data,
        } = this.state;
        const { user, password } = data;


        const path = role === 1 ? '/admin/dashboard' : '/entrada';
        if (loggedin) {
            return (
                <Redirect to={path} />
            );
        }

        return (
            <LayoutFullWidth>
                <Box>
                    <Logo padding={30} maxWidth={150} />
                    <div className="login-container">
                        <Input type="text" name="user" onChange={this.onChange} value={user} icon="fas fa-user-tie" placeholder="Usuario" errors={errors} />
                        <Input type="password" name="password" onChange={this.onChange} onKeyPress={this.onKeyPress} value={password} icon="fas fa-unlock-alt" placeholder="Contraseña" errors={errors} />
                        <div className="login-footer">
                            <Button type="submit" onClick={this.handleSignIn} text="Entrar" />
                        </div>
                    </div>
                    <Link to="/recuperar" className="link-login">Olvidó su contraseña</Link>
                </Box>

                <AlertDialog
                    message={alertMessage}
                    show={showAlertError}
                    onConfirm={() => { this.setState({ showAlertError: false }); }}
                />
            </LayoutFullWidth>
        );
    }
}

Login.contextType = StateContext;

export default Login;
