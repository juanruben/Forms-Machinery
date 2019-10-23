import React, {Component} from 'react';

import Logo from './../../Assets/Images/Logo.png';

import MenuAdministrador from './MenuAdministrador';
import MenuOperador from './MenuOperador';

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
							<img src={Logo} alt="" />
						</span>
					</div>
					<br/>
					{this.props.tipo === 'administrador' ? <MenuAdministrador/> : <MenuOperador/>}

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