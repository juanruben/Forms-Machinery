import React, { Component } from 'react';
import Session from '../../Service/Session';
import Logo from '../../Assets/images/Logo.png';
import LayoutMenu from './Menu/Layout';
import dataOperador from './Menu/dataOperador';
import dataAdministrador from './Menu/dataAdministrador';

export default class SiedebarLeft extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.Session.close();
    window.location.assign('/');
  }

  render() {
    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <div className="sidebar-left sidenav">
        <ul className="p-0">
          <div className="text-center">
            <span className="bar-sidebar-left">
              <img src={Logo} alt="" className="logo-menu" />
            </span>
          </div>
          <br />
          {Session.getInfoUser().NPerfil === 1
            ? (
              <LayoutMenu items={dataAdministrador} path="/administrador" />
            ) : (
              <LayoutMenu items={dataOperador} path="/operador" />
            )}
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
