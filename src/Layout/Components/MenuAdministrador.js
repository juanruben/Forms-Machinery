import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Collapse } from 'reactstrap';

export default class MenuAdministrador extends Component {
	constructor(props) {
		super(props);
		this.state = {
            collapse: false
        };
        this.toggle = this.toggle.bind(this);
    }
    toggle(event) {
        event.preventDefault()
        this.setState(state => ({ collapse: !state.collapse }));
    }
	render() {
        let path = '/administrador/';
		return (
            <>
                <Link>
                    <li className="li-link">
                        <span className="sidebar-label">
                            Registro Histórico
                        </span>
                    </li>
                </Link>
                <Link onClick={this.toggle}>
                    <li  className="li-link">
                        <span className="sidebar-label">
                            Admin. Clientes
                        </span>
                        <Collapse isOpen={this.state.collapse}>
                            <Link to={path+'cliente/agregar'}>
                                <li  className="li-link">
                                    <span className="sidebar-label">
                                        Agregar Cliente
                                    </span>
                                </li>
                            </Link>
                            <Link to={path+'cliente/lists'}>
                                <li  className="li-link">
                                    <span className="sidebar-label">
                                        Admin. Clientes
                                    </span>
                                </li>
                            </Link>
                        </Collapse>
                    </li>
                </Link>
                <Link onClick={this.toggle}>
                    <li  className="li-link">
                        <span className="sidebar-label">
                            Admin. Usuarios
                        </span>
                        <Collapse isOpen={this.state.collapse}>
                            <Link to={path+'usuario/agregar'}>
                                <li  className="li-link">
                                    <span className="sidebar-label">
                                        Agregar Usuario
                                    </span>
                                </li>
                            </Link>
                            <Link to={path+'usuario/lists'}>
                                <li  className="li-link">
                                    <span className="sidebar-label">
                                        Admin. Usuarios
                                    </span>
                                </li>
                            </Link>
                        </Collapse>
                    </li>
                </Link>
                <Link onClick={this.toggle}>
                    <li  className="li-link">
                        <span className="sidebar-label">
                            Admin. Maquina
                        </span>
                        <Collapse isOpen={this.state.collapse}>
                            <Link to={path+'maquina/agregar'}>
                                <li  className="li-link">
                                    <span className="sidebar-label">
                                        Agregar Maquina
                                    </span>
                                </li>
                            </Link>
                            <Link to={path+'maquina/lists'}>
                                <li  className="li-link">
                                    <span className="sidebar-label">
                                        Admin. Maquina
                                    </span>
                                </li>
                            </Link>
                        </Collapse>
                    </li>
                </Link>
                <Link onClick={this.toggle}>
                    <li  className="li-link">
                        <span className="sidebar-label">
                            Admin. Formularios
                        </span>
                        <Collapse isOpen={this.state.collapse}>
                            <Link to={path+'formulario/agregar'}>
                                <li  className="li-link">
                                    <span className="sidebar-label">
                                        Agregar Formulario
                                    </span>
                                </li>
                            </Link>
                            <Link to={path+'formulario/lists'}>
                                <li  className="li-link">
                                    <span className="sidebar-label">
                                        Admin. Formularios
                                    </span>
                                </li>
                            </Link>
                        </Collapse>
                    </li>
                </Link>
                <Link onClick={this.toggle}>
                    <li  className="li-link">
                        <span className="sidebar-label">
                            Admin. Notificaciones
                        </span>
                        <Collapse isOpen={this.state.collapse}>
                            <Link to={path+'notificacion/agregar'}>
                                <li  className="li-link">
                                    <span className="sidebar-label">
                                        Agregar Notificación
                                    </span>
                                </li>
                            </Link>
                            <Link to={path+'notificacion/lists'}>
                                <li  className="li-link">
                                    <span className="sidebar-label">
                                        Admin. Notificaciones
                                    </span>
                                </li>
                            </Link>
                        </Collapse>
                    </li>
                </Link>
            </>
        );
    }
}