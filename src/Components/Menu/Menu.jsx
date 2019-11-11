import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../State';
import Logo from '../Logo/Logo';
import Avatar from '../Avatar/Avatar';
import './Menu.scss';

const Menu = (props) => {
    const { items, username, avatar } = props;
    const state = useStateValue();

    const test = () => {
        const [, dispatch] = state;
        dispatch({
            type: 'EXIT',
        });
    };

    return (
        <div className="sidebar">
            <div className="content">
                <Logo />
                <Avatar title={username} image={avatar} />
                {items.map((item) => (
                    <Link key={item.id} to={item.path} className="sidebarLink">{item.title}</Link>
                ))}
                <button type="button" onClick={test}>Salir</button>
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
