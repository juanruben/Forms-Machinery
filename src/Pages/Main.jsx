import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Sidebar from 'react-sidebar';
// import { useStateValue } from '../State';
import Menu from '../Components/Menu/Menu';
import Admin from './Admin';
import Operator from './Operator';

import dataMenu from './dataMenuAdmin';
import './Main.scss';

const mql = window.matchMedia('(min-width: 800px)');

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            docked: mql.matches,
            transitions: false,
        };

        this.menuButtonClick = this.menuButtonClick.bind(this);
        this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    }

    componentDidMount() {
        mql.addListener(this.mediaQueryChanged);
    }

    componentWillUnmount() {
        mql.removeListener(this.mediaQueryChanged);
    }

    mediaQueryChanged() {
        this.setState({
            docked: mql.matches,
        });
    }

    menuButtonClick(event) {
        event.preventDefault();
        const { docked } = this.state;
        this.setState({
            transitions: true,
            docked: !docked,
        });
    }

    render() {
        const { docked, transitions } = this.state;

        const sidebarProps = {
            sidebar: <Menu items={dataMenu} />,
            docked,
            transitions,
        };

        return (
            <Sidebar {...sidebarProps}>
                <div className="content-area">
                    <button onClick={this.menuButtonClick} type="button">Menú</button>
                    Contenido....
                    <Switch>
                        <Route exact path="/admin/clientes" component={Admin} />
                        <Route exact path="/admin/usuarios" component={Admin} />
                        <Route exact path="/admin/maquinas" component={Admin} />
                        <Route exact path="/admin/formularios" component={Admin} />
                        <Route exact path="/admin" component={Admin} />
                        <Route exact path="/entrada" component={Operator} />
                        <Route exact path="/salida" component={Operator} />
                        <Route exact path="/" component={Operator} />
                    </Switch>
                </div>
            </Sidebar>
        );
    }
}

export default Main;
