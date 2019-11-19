import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import { StateContext } from '../../State';
import { validateUsername, validatePassword } from '../../Service/Utils';
import LayoutFullWidth from '../../Layout/LayoutFullWidth/LayoutFullWidth';
import Box from '../../Layout/Box/Box';
import Logo from '../../Components/Logo/Logo';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import { login } from '../../Service/__mocks__/Api';
// import { login } from '../../Service/Api';
import './Login.scss';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errors: {},
            showAlertError: false,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.validForm = this.validForm.bind(this);
        this.checkLoggedIn = this.checkLoggedIn.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
        this.requestSignIn = this.requestSignIn.bind(this);
        this.signIn = this.signIn.bind(this);
    }

    componentDidMount() {
        this.checkLoggedIn();
    }

    checkLoggedIn() {
        const [, dispatch] = this.context;
        dispatch({
            type: 'LOAD_SESSION',
        });
    }

    validForm() {
        const { username, password } = this.state;
        const errors = {};
        let formIsValid = true;

        if (username.trim().length === 0) {
            formIsValid = false;
            errors.username = 'Requerido';
        } else if (!validateUsername(username)) {
            formIsValid = false;
            errors.username = 'Error de formato';
        }

        if (password.trim().length === 0) {
            formIsValid = false;
            errors.password = 'Requerido';
        } else if (!validatePassword(password)) {
            formIsValid = false;
            errors.password = 'Error de formato';
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
        const { username, password } = this.state;
        await login(username, password).then((response) => {
            if (response && response.status === 200) {
                const { data } = response;
                this.signIn(data.token, data.role);
            } else {
                this.setState({
                    showAlertError: true,
                });
            }
            this.toggleLoading(false);
        });
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

    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
            errors: {},
        });
    }

    render() {
        const [{ loggedin, role }] = this.context;
        const { showAlertError } = this.state;
        const {
            username,
            password,
            errors,
        } = this.state;

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
                        <Input type="text" name="username" onChange={this.handleInputChange} value={username} icon="fas fa-user-tie" placeholder="Usuario" errors={errors.username} />
                        <Input type="password" name="password" onChange={this.handleInputChange} value={password} icon="fas fa-unlock-alt" placeholder="Contraseña" errors={errors.password} />
                        <Button type="submit" onClick={this.handleSignIn} text="Entrar" />
                    </div>
                    <Link to="/recuperar" className="link-login">Olvidó su contraseña</Link>
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
                    No hay acceso al sistema
                </SweetAlert>
            </LayoutFullWidth>
        );
    }
}

Login.contextType = StateContext;

export default Login;
