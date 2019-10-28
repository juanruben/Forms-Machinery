import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Collapse } from 'reactstrap';

const menu = [
  {
    name: 'Entradas y Salidas',
    link: '#',
    submenu: [
      {
        name: 'Check In',
        link: '/cliente/agregar',
      },
      {
        name: 'Check Out',
        link: '/cliente/lists',
      },
    ],
  },
];


export default class MenuOperador extends Component {
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
                <Collapse isOpen={collapse === (index + 1)}>
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
