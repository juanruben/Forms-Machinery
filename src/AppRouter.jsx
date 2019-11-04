import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
// import Login from './Pages/Login';
// import Recuperar from './Pages/Recover';
// import Administrador from './Pages/Administrador/App';
// import Operador from './Pages/Operador/App';

const AppRouter = () => (
    <Router>
        <Switch>
            {/* <Route exact path="/" component={Login} />
            <Route exact path="/Recuperar" component={Recuperar} />
            <Route path="/administrador/" component={Administrador} />
            <Route path="/operador/" component={Operador} /> */}
        </Switch>
    </Router>
);

export default AppRouter;
