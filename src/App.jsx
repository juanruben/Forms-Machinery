import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './Pages/Login.jsx';
import Recuperar from './Pages/Recuperar.jsx';
import Administrador from './Pages/Administrador/App.jsx';
import Operador from './Pages/Operador/App.jsx';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/Recuperar" component={Recuperar} />
      <Route path="/administrador/" component={Administrador} />
      <Route path="/operador/" component={Operador} />
    </Switch>
  </Router>
);

export default App;
