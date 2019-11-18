import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';
import Sidebar from 'react-sidebar';
import { StateContext } from '../../State';
import Menu from '../../Components/Menu/Menu';
import MenuButton from '../../Components/MenuButton/MenuButton';
import Title from '../../Components/Title/Title';
import History from '../../Pages/History/History';
import Clients from '../../Pages/Clients/Clients';
import Machines from '../../Pages/Machines/Machines';
import Users from '../../Pages/Users/Users';
import Forms from '../../Pages/Forms/Forms';
import Sections from '../../Pages/Forms/Sections';
import Fields from '../../Pages/Forms/Fields';
import CheckIn from '../../Pages/CheckIn/CheckIn';
import CheckOut from '../../Pages/CheckOut/CheckOut';

import menuAdmin from './data/dataMenuAdmin';
import menuOp from './data/dataMenuOp';

import avatar from './avatar.png';

import './Main.scss';

const mql = window.matchMedia('(min-width: 800px)');

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            docked: mql.matches,
            transitions: false,
            dataMenu: [],
            username: '',
        };

        this.menuButtonClick = this.menuButtonClick.bind(this);
        this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
        this.checkLoggedIn = this.checkLoggedIn.bind(this);
        this.findTitle = this.findTitle.bind(this);
    }

    componentDidMount() {
        mql.addListener(this.mediaQueryChanged);
        this.findTitle();
        this.checkLoggedIn();
    }

    componentWillUnmount() {
        mql.removeListener(this.mediaQueryChanged);
    }

    mediaQueryChanged() {
        this.setState({
            docked: mql.matches,
        });
    }

    checkLoggedIn() {
        const [{ role }, dispatch] = this.context;
        if (!role) {
            dispatch({
                type: 'LOAD_SESSION',
            });
        } else {
            this.setState({
                dataMenu: role === 1 ? menuAdmin : menuOp,
                username: role === 1 ? 'administrador' : 'operador',
            }, () => {
                this.checkPermission();
            });
        }
    }

    checkPermission() {
        const { location } = this.props;
        const { pathname } = location;
        const { dataMenu } = this.state;
        const [, dispatch] = this.context;

        const item = dataMenu.find((v) => v.path === pathname);

        if (!item) {
            dispatch({
                type: 'EXIT',
            });
        }
    }

    findTitle() {
        const { location } = this.props;
        const { pathname } = location;
        const { dataMenu } = this.state;

        const item = dataMenu.find((v) => v.path === pathname);
        return item ? item.title : '';
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
        const {
            docked, transitions, dataMenu, username,
        } = this.state;

        const sidebarProps = {
            sidebar: <Menu items={dataMenu} username={username} avatar={avatar} />,
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
                        <Route exact path="/admin/formularios" component={Forms} />
                        <Route exact path="/admin/formularios/:id" component={Sections} />
                        <Route exact path="/admin/formularios/secciones/:id" component={Fields} />
                        <Route exact path="/entrada" component={CheckIn} />
                        <Route exact path="/salida" component={CheckOut} />
                    </Switch>
                </div>
            </Sidebar>
        );
    }
}

Main.contextType = StateContext;

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
