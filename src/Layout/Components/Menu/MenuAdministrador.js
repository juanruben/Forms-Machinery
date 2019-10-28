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
        link: '/cliente/add',
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
        link: '/usuario/add',
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
        link: '/maquina/add',
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
        link: '/formulario/add',
      },
      {
        name: 'Admin. Formularios',
        link: '/formulario/lists',
      },
    ],
  },
];


export default class MenuAdministrador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      path: '/administrador',
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
    const { collapse, path } = this.state;
    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <>
        {menu.map((item, index) => (
          <Link to={path + item.link} onClick={(e) => { this.toggle(e, index + 1); }} key={index}>
            <li className="li-link">
              <span className="sidebar-label">
                {item.name}
              </span>
              <ul>
                {typeof item.submenu !== 'undefined' ? (
                  <Collapse isOpen={collapse === (index + 1)}>
                    {item.submenu.map((item2, index2) => (
                      <Link to={path + item2.link} key={index2}>
                        <li className="li-sub-link">
                          <span className="sidebar-label">
                            {item2.name}
                          </span>
                        </li>
                      </Link>
                    ))}
                  </Collapse>
                ) : null}
              </ul>
            </li>
          </Link>
        ))}
      </>
    );
  }
}
