import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { StateContext } from '../../State';
import Session from '../../Service/Session';
import LoginApi from '../../Service/LoginApi';
import LayoutFullWidth from '../../Layout/LayoutFullWidth/LayoutFullWidth';
import Logo from '../../Components/Logo/Logo';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';

class Login extends Component {
    static contextType = StateContext;

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errors: {},
            loggedin: false,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
        this.checkLoggedIn = this.checkLoggedIn.bind(this);
        this.login = this.login.bind(this);
    }

    componentDidMount() {
        this.checkLoggedIn();
    }

    checkLoggedIn() {
        const loggedin = Session.isAuth();
        this.setState({
            loggedin,
        });
    }

    handleValidation() {
        const { username, password } = this.state;
        const errors = {};
        let formIsValid = true;

        // username
        if (!username) {
            formIsValid = false;
            errors.username = 'No puede ser vacío';
        }

        // password
        if (!password) {
            formIsValid = false;
            errors.password = 'No puede ser vacío';
        }

        this.setState({
            errors,
        });

        return formIsValid;
    }

    toggleLoading(value) {
        const [, dispatch] = this.context;
        dispatch({
            type: 'setLoading',
            value,
        });
    }

    async login() {
        if (this.handleValidation()) {
            this.toggleLoading(true);
            const { username, password } = this.state;

            // const response = await LoginApi({
            //     username,
            //     password,
            // });
            this.setState({
                loggedin: true,
            });

            // if (responseApi.result === 'success') {
            //     if (responseApi.perfil === 1) {
            //         window.location.assign('/administrador/');
            //     } else {
            //         window.location.assign('/operador/');
            //     }
            // }

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
        const {
            username,
            password,
            errors,
            loggedin,
        } = this.state;

        if (loggedin) {
            return (
                <Redirect to="/" />
            );
        }

        return (
            <LayoutFullWidth>
                <Logo />
                <Input type="text" name="username" onChange={this.handleInputChange} value={username} icon="fas fa-user-tie" placeholder="Usuario" errors={errors.username} />
                <Input type="password" name="password" onChange={this.handleInputChange} value={password} icon="fas fa-unlock-alt" placeholder="Contraseña" errors={errors.password} />
                <Button type="submit" onClick={this.login} text="Entrar" />
                <Link to="/recuperar" className="link-login">Olvidó su contraseña</Link>
                {loggedin && <div>Logueado</div>}
            </LayoutFullWidth>
        );
    }
}

export default Login;
