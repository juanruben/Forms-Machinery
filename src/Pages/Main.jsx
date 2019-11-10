import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { StateContext } from '../State';
import Admin from './Admin';
import Operator from './Operator';
import Page404 from '../Components/Page404';

class Main extends Component {
    // const [{ role }, dispatch] = useStateValue();

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const [, dispatch] = this.context;
        dispatch({
            type: 'EXIT',
        });
    }

    // const View = role === 1 ? <Admin /> : <Operator />;
    render() {
        const [{ role }] = this.context;
        return (
            <>
                fjadslfa:
                {role}
                <button type="submit" onClick={this.handleClick}>
                    Salir
                </button>
                <Switch>
                    <Route path="/admin" component={Admin} />
                    <Route path="/op" component={Operator} />
                    <Route component={Page404} />
                </Switch>
            </>
        );
    }
}

Main.contextType = StateContext;

export default Main;
