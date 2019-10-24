import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Components/Home';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/operador/home/" component={Home} />
    </Switch>
  </Router>
);
export default App;
