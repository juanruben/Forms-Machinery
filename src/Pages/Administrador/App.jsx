import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Components/Home';
import RegistroHistorico from './Components/RegistroHistorico';
import ClienteAgregar from './Components/ClienteAgregar';
import ClienteLists from './Components/ClienteLists';
const App = () => (
  <Router>
    <Switch>
      <Route exact path="/administrador/home/" component={Home} />
      <Route exact path="/administrador/registro-historico/" component={RegistroHistorico} />
      <Route exact path="/administrador/cliente/agregar/" component={ClienteAgregar} />
      <Route exact path="/administrador/cliente/lists/" component={ClienteLists} />
    </Switch>
  </Router>
);
export default App;