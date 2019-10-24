import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './Components/Home';
import RegistroHistorico from './Components/RegistroHistorico';

class App extends Component {
	render() {
		return (
            <Router>
                <Switch> 
                    <Route exact path="/administrador/home/" component={Home}/>
                    <Route exact path="/administrador/registro-historico/" component={RegistroHistorico}/>
                </Switch>
            </Router>
        )
	}
}

export default App;