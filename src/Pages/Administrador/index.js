import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './Components/Home';
import RegistroHistorico from './Components/RegistroHistorico';
import ClienteLists from './Components/ClienteLists';
import ClienteAgregar from './Components/ClienteAgregar';

class App extends Component {
	render() {
		return (
            <Router>
                <Switch>
                    <Route exact path="/administrador/home/" component={Home}/>
                    <Route exact path="/administrador/registro-historico/" component={RegistroHistorico}/>
                    <Route exact path="/administrador/cliente/lists/" component={ClienteLists}/>
                    <Route exact path="/administrador/cliente/agregar/" component={ClienteAgregar}/>
                </Switch>
            </Router>
        )
	}
}

export default App;