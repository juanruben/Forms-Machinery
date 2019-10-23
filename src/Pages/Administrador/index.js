import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './Components/Home';

class App extends Component {
	render() {
		return (
            <Router>
                <Switch> 
                    <Route exact path="/administrador/home/" component={Home}/>
                </Switch>
            </Router>
        )
	}
}

export default App;