import React, {Component} from 'react';
import { Link } from "react-router-dom";

export default class SiedebarLeft extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div className='sidebar-left sidenav' >
				<ul className="p-0">
					<div className="">
						<span className="bar-sidebar-left">
						</span>
					</div>
					<br/>
					<Link to="servicios-contratados/">
						<li className="li-link">
							<span className="sidebar-label">
								Mis Servicios Contratados
							</span>
						</li>
					</Link>
					<Link to="cartola-de-pago/">
						<li  className="li-link">
							<span className="sidebar-label">
								Cartola de Pago
							</span>
						</li>
					</Link>
					<Link to="mis-datos/">
						<li  className="li-link">
							<span className="sidebar-label">
								Mis Datos
							</span>
						</li>
					</Link>
					<Link to="cambiar-contrasena/">
						<li  className="li-link">
							<span className="sidebar-label">
								Cambiar Contraseña
							</span>
						</li>
					</Link>

					<Link to="preguntas-frecuentes/">
						<li className="li-link">
							<span className="sidebar-label">
								Preguntas Frecuentes
							</span>
						</li>
					</Link>
					<Link to="contacto/">
						<li className="li-link">
							<span className="sidebar-label">
								Contacto
							</span>
						</li>
					</Link>
					<li className="li-link" onClick={this.handleClose}>
						<span className="sidebar-label">
							Cerrar sesión
						</span>
					</li>
				</ul>
			</div>
		);
	}
}