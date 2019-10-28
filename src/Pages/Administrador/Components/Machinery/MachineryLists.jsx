import React, { Component } from 'react';
import Layout from '../../../../Layout/MainPrivate';

const items = [
  {
    cliente: 'kkll29',
    fecha: '24-10-2019',
    rut_empresa: '33.333.333-3',
    telefono: '123456789',
    estado: 'En Obra',
  },
  {
    cliente: 'kkll29',
    fecha: '24-10-2019',
    rut_empresa: '22.222.222-2',
    telefono: '123456789',
    estado: 'En Obra',
  },
  {
    cliente: 'kkll29',
    fecha: '24-10-2019',
    rut_empresa: '11.111.111-1',
    telefono: '123456789',
    estado: 'En Obra',
  },
];
class MachineryLists extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Layout name="Administrador de Maquinas">
        <div className="table-responsive">
          <table className="table table-orange">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Fecha de creación</th>
                <th>Rut Empresa</th>
                <th>Teléfono</th>
                <th>Estado</th>
                <th>Ver PDF</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr>
                  <td>{item.cliente}</td>
                  <td>{item.fecha}</td>
                  <td>{item.rut_empresa}</td>
                  <td>{item.telefono}</td>
                  <td>{item.estado}</td>
                  <td>ver pdf</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Layout>
    );
  }
}

export default MachineryLists;
