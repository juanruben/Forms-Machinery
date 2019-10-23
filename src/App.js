import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './Pages/Login';
import Recuperar from './Pages/Recuperar';
import Administrador from './Pages/Administrador';
import Operador from './Pages/Operador';

class App extends Component {
	render() {
		return (
        <Router>
            <Switch> 
              <Route exact path="/" component={Login}/>
              <Route exact path="/Recuperar" component={Recuperar}/>
              <Route path="/administrador/" component={Administrador}/>
              <Route path="/operador/" component={Operador}/>
            </Switch>
        </Router>
    )
	}
}

export default App;