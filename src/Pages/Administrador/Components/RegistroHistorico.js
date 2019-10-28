import React, { Component } from 'react';
import Layout from '../../../Layout/MainPrivate';
import PopUp from './PopUpRegistroHistorico';

const items = [
  {
    patente: 'kkll29',
    fecha: '24-10-2019',
    id_maquina: '1',
    cliente: 'Agrosuper',
    tipo_operador: 'Conductor',
    nombre_operador: 'Fulanito detal',
    estado: 'En Obra',
    recepcion: 'Jorge González',
  },
  {
    patente: 'kkll29',
    fecha: '24-10-2019',
    id_maquina: '2',
    cliente: 'CCU',
    tipo_operador: 'Conductor',
    nombre_operador: 'Fulanito detal',
    estado: 'En Obra',
    recepcion: 'Jorge González',
  },
  {
    patente: 'kkll29',
    fecha: '24-10-2019',
    id_maquina: '3',
    cliente: 'Lider',
    tipo_operador: 'Conductor',
    nombre_operador: 'Fulanito detal',
    estado: 'En Obra',
    recepcion: 'Jorge González',
  },
];

class RegistroHistorico extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <Layout name="Registro Histórico">
        <div className="table-responsive">
          <table className="table table-orange">
            <thead>
              <tr>
                <th>Patente</th>
                <th>Fecha</th>
                <th>ID Maquina</th>
                <th>Cliente</th>
                <th>Tipo de operador</th>
                <th>Nombre Operador</th>
                <th>Estado</th>
                <th>Recepción por</th>
                <th>Ver PDF</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.patente}>
                  <td>{item.patente}</td>
                  <td>{item.fecha}</td>
                  <td>{item.id_maquina}</td>
                  <td>{item.cliente}</td>
                  <td>{item.tipo_operador}</td>
                  <td>{item.nombre_operador}</td>
                  <td>{item.estado}</td>
                  <td>{item.recepcion}</td>
                  <td><PopUp /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Layout>
    );
  }
}

export default RegistroHistorico;
