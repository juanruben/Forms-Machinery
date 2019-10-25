import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Collapse } from 'reactstrap';

const menu = [
  {
    name: 'Registro Histórico',
    link: '/registro-historico/',
  },
  {
    name: 'Admin. Clientes',
    link: '#',
    submenu: [
      {
        name: 'Agregar Cliente',
        link: '/cliente/agregar',
      },
      {
        name: 'Admin. Clientes',
        link: '/cliente/lists',
      },
    ],
  },
  {
    name: 'Admin. Usuarios',
    link: '#',
    submenu: [
      {
        name: 'Agregar Usuario',
        link: '/usuario/agregar',
      },
      {
        name: 'Admin. Usuario',
        link: '/usuario/lists',
      },
    ],
  },
  {
    name: 'Admin. Maquina',
    link: '#',
    submenu: [
      {
        name: 'Agregar Maquina',
        link: '/maquina/agregar',
      },
      {
        name: 'Admin. Maquina',
        link: '/maquina/lists',
      },
    ],
  },
  {
    name: 'Admin. Formularios',
    link: '#',
    submenu: [
      {
        name: 'Agregar Formularios',
        link: '/formulario/agregar',
      },
      {
        name: 'Admin. Formularios',
        link: '/formulario/lists',
      },
    ],
  },
  {
    name: 'Admin. Notificaciones',
    link: '#',
    submenu: [
      {
        name: 'Agregar Notificaciones',
        link: '/notificaciones/agregar',
      },
      {
        name: 'Admin. Notificaciones',
        link: '/notificaciones/lists',
      },
    ],
  },
];


export default class MenuAdministrador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle(e, tab) {
    const { collapse } = this.state;
    e.preventDefault();
    if (collapse !== tab) {
      this.setState({
        collapse: tab,
      });
    } else {
      this.setState({
        collapse: 0,
      });
    }
  }

  render() {
    const path = '/administrador';
    const { collapse } = this.state;
    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <>
        {menu.map((item, index) => (
          <Link to={path + item.link} onClick={(e) => { this.toggle(e, index + 1); }}>
            <li className="li-link">
              <span className="sidebar-label">
                {item.name}
              </span>
              {typeof item.submenu !== 'undefined' ? (
                <Collapse isOpen={parseInt(collapse) === (index + 1)}>
                  {item.submenu.map((item2) => (
                    <Link to={path + item2.link}>
                      <li className="li-sub-link">
                        <span className="sidebar-label">
                          {item2.name}
                        </span>
                      </li>
                    </Link>
                  ))}
                </Collapse>
              ) : null}
            </li>
          </Link>
        ))}
      </>
    );
  }
}
