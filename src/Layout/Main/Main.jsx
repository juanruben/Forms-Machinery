import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';
import Sidebar from 'react-sidebar';
// import { useStateValue } from '../State';
import Menu from '../../Components/Menu/Menu';
import MenuButton from '../../Components/MenuButton/MenuButton';
import Title from '../../Components/Title/Title';
import History from '../../Pages/History/History';
import Clients from '../../Pages/Clients/Clients';
import Machines from '../../Pages/Machines/Machines';
import Users from '../../Pages/Users/Users';
import CheckIn from '../../Pages/CheckIn/CheckIn';
import CheckOut from '../../Pages/CheckOut/CheckOut';

import dataMenu from './data/dataMenuAdmin';
import avatar from '../../Assets/images/avatar.png';

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
        this.findTitle = this.findTitle.bind(this);
    }

    componentDidMount() {
        mql.addListener(this.mediaQueryChanged);
        this.findTitle();
    }

    componentWillUnmount() {
        mql.removeListener(this.mediaQueryChanged);
    }

    mediaQueryChanged() {
        this.setState({
            docked: mql.matches,
        });
    }

    findTitle() {
        const { location } = this.props;
        const { pathname } = location;
        return dataMenu.find((item) => item.path === pathname).title;
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
            sidebar: <Menu items={dataMenu} username="administrador" avatar={avatar} />,
            docked,
            shadow: false,
            transitions,
        };

        return (
            <Sidebar {...sidebarProps}>
                <div className="top-area">
                    <MenuButton onClick={this.menuButtonClick} />
                    <Title text={this.findTitle()} />
                </div>
                <div className="content-area">
                    <Switch>
                        <Route exact path="/admin/dashboard" component={History} />
                        <Route exact path="/admin/clientes" component={Clients} />
                        <Route exact path="/admin/usuarios" component={Users} />
                        <Route exact path="/admin/maquinas" component={Machines} />
                        <Route exact path="/admin/formularios" component={History} />
                        <Route exact path="/admin/dashboard" component={History} />
                        <Route exact path="/entrada" component={Operator} />
                        <Route exact path="/salida" component={Operator} />
                    </Switch>
                </div>
            </Sidebar>
        );
    }
}

Main.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }),
};

Main.defaultProps = {
    location: {
        pathname: '',
    },
};

export default withRouter(Main);