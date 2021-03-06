import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { useStateValue } from '../../State';
import Logo from '../Logo/Logo';
import Avatar from '../Avatar/Avatar';
import { logout } from '../../Service/Api';

import './Menu.scss';

const Menu = (props) => {
    const { items, username, avatar } = props;
    const state = useStateValue();

    async function handleSignOut() {
        const [, dispatch] = state;

        await logout()
            .then(() => {
                dispatch({
                    type: 'EXIT',
                });
            }).catch(() => {
                dispatch({
                    type: 'EXIT',
                });
            });
    }

    return (
        <div className="sidebar-container">
            <div className="content">
                <Logo />
                <Avatar title={username} image={avatar} />
                <ul className="menu-items">
                    {items.map((item) => (
                        <NavLink to={item.path} key={item.id} className="item-container" activeClassName="active">
                            <li className="single-item">
                                <span><i className={item.icon} /></span>
                                {item.title}
                            </li>
                        </NavLink>
                    ))}
                    <li>
                        <button type="button" onClick={handleSignOut}>
                            <span><i className="fas fa-door-open" /></span>
                            Cerrar sesión
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

Menu.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            path: PropTypes.string.isRequired,
            icon: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    username: PropTypes.string,
    avatar: PropTypes.string,
};

Menu.defaultProps = {
    username: '',
    avatar: '',
};

export default Menu;
