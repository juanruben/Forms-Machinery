import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { StateContext } from '../../State';
import { validateUsername, validatePassword } from '../../Service/Utils';
import LayoutFullWidth from '../../Layout/LayoutFullWidth/LayoutFullWidth';
import Box from '../../Layout/Box/Box';
import Logo from '../../Components/Logo/Logo';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import { login } from '../../Service/__mocks__/Api';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errors: {},
            rol: 1,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
        this.checkLoggedIn = this.checkLoggedIn.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
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

    handleValidation() {
        const { username, password } = this.state;
        const errors = {};
        let formIsValid = true;

        if (!validateUsername(username)) {
            formIsValid = false;
            errors.username = 'Error de formato username';
        }

        if (!validatePassword(password)) {
            formIsValid = false;
            errors.password = 'Error de formato de contraseña';
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

    async signIn() {
        const { username, password } = this.state;
        return login(username, password);
    }

    handleSignIn() {
        if (this.handleValidation()) {
            this.toggleLoading(true);

            const response = this.signIn();

            if (response.token) {
                const [, dispatch] = this.context;

                dispatch({
                    type: 'SIGN_IN',
                    value: { token: response.token, role: 1 },
                });
            }

            this.toggleLoading(false);
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
        const {
            username,
            password,
            errors,
            rol,
        } = this.state;

        const path = role === 1 ? '/admin' : '/op';
        if (loggedin) {
            return (
                <Redirect to={path} />
            );
        }

        return (
            <LayoutFullWidth>
                <Box>
                    <Logo />
                    <Input type="text" name="username" onChange={this.handleInputChange} value={username} icon="fas fa-user-tie" placeholder="Usuario" errors={errors.username} />
                    <Input type="password" name="password" onChange={this.handleInputChange} value={password} icon="fas fa-unlock-alt" placeholder="Contraseña" errors={errors.password} />
                    <Input type="text" name="rol" onChange={this.handleInputChange} value={rol} icon="fas fa-unlock-alt" placeholder="Rol" errors={errors.rol} />
                    <Button type="submit" onClick={this.handleSignIn} text="Entrar" />
                    <Link to="/recuperar" className="link-login">Olvidó su contraseña</Link>
                </Box>
            </LayoutFullWidth>
        );
    }
}

Login.contextType = StateContext;

export default Login;
