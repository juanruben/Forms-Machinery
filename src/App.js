import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './Pages/Login';
import Home from './Pages/Home';

class App extends Component {
	render() {
		return (
        <Router>
            <Switch> 
              <Route exact path="/" component={Login}  />
              <Route exact path="/Home" component={Home}  />
            </Switch>
        </Router>
    )
	}
}

export default App;