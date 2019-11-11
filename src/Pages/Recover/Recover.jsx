import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { StateContext } from '../../State';
import { validateEmail } from '../../Service/Utils';
import LayoutFullWidth from '../../Layout/LayoutFullWidth/LayoutFullWidth';
import Box from '../../Layout/Box/Box';
import Logo from '../../Components/Logo/Logo';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';

import './Recover.scss';

class Recover extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            errors: {},
            sent: false,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.validForm = this.validForm.bind(this);
        this.send = this.send.bind(this);
    }

    validForm() {
        const { email } = this.state;
        const errors = {};
        let formIsValid = true;

        if (!validateEmail(email)) {
            formIsValid = false;
            errors.email = 'Error de formato de email';
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
            // const { email } = this.state;

            // const response = await LoginApi({
            //     username,
            //     password,
            // });
            this.setState({
                sent: true,
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
            email,
            errors,
            sent,
        } = this.state;

        return (
            <LayoutFullWidth>
                <Box>
                    <Logo padding={30} maxWidth={150} />
                    <Input type="email" name="email" onChange={this.handleInputChange} value={email} icon="far fa-envelope" placeholder="Correo electrónico" errors={errors.email} />
                    <Button type="button" onClick={this.send} text="Enviar" />
                    <Link to="/" className="link-login">Volver</Link>
                </Box>
                {sent && <div className="message-ok">Revisa tu correo y verifica tu contraseña</div>}
            </LayoutFullWidth>
        );
    }
}

Recover.contextType = StateContext;

export default Recover;
