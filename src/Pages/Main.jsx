import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useStateValue } from '../State';
import Admin from './Admin';
import Operator from './Operator';
import Page404 from '../Components/Page404';

function Main() {
    const context = useStateValue();
    function handleClick() {
        const [, dispatch] = context;
        dispatch({
            type: 'EXIT',
        });
    }

    // const View = role === 1 ? <Admin /> : <Operator />;
    return (
        <>
            fjadslf:
            <button type="submit" onClick={handleClick}>
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

export default Main;
