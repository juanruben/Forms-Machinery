import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Components/Home';
import RegistroHistorico from './Components/RegistroHistorico';
import ClientLists from './Components/Client/ClientLists';
import ClientAdd from './Components/Client/ClientAdd';
import UserLists from './Components/User/UserLists';
import UserAdd from './Components/User/UserAdd';
import FormAdd from './Components/Form/FormAdd';
import FormLists from './Components/Form/FormLists';
import MachineryLists from './Components/Machinery/MachineryLists';
import MachineryAdd from './Components/Machinery/MachineryAdd';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/administrador/home/" component={Home} />
      <Route exact path="/administrador/registro-historico/" component={RegistroHistorico} />
      <Route exact path="/administrador/cliente/add/" component={ClientAdd} />
      <Route exact path="/administrador/cliente/lists/" component={ClientLists} />
      <Route exact path="/administrador/usuario/add/" component={UserAdd} />
      <Route exact path="/administrador/usuario/lists/" component={UserLists} />
      <Route exact path="/administrador/maquina/add/" component={MachineryAdd} />
      <Route exact path="/administrador/maquina/lists/" component={MachineryLists} />
      <Route exact path="/administrador/formulario/add/" component={FormAdd} />
      <Route exact path="/administrador/formulario/lists/" component={FormLists} />
    </Switch>
  </Router>
);

export default App;
