import React from 'react';
import PropTypes from 'prop-types';
import {
    BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import { useStateValue } from './State';
import Login from './Pages/Login/Login';
import Recover from './Pages/Recover/Recover';
import Main from './Pages/Main';
import Page404 from './Components/Page404/Page404';

export const PrivateRoute = ({ component: Component, ...rest }) => {
    const [{ loggedin }] = useStateValue();
    if (loggedin) {
        return (
            <Route component={() => <Component {...rest} />} />
        );
    }
    return <Redirect to="/login" />;
};

PrivateRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
};

const AppRouter = () => (
    <Router>
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/recuperar" component={Recover} />
            <PrivateRoute path="/" component={Main} />
            <Route component={Page404} />
        </Switch>
    </Router>
);

export default AppRouter;
