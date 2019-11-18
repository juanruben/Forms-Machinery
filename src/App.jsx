import React from 'react';
import { StateProvider } from './State';
import { encode, decode } from './Service/Utils';
import AppWithLoader from './AppWithLoader';

import './styles.scss';

export const initialState = {
    token: null,
    loggedin: true,
    loading: false,
    role: null,
};

export const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.value,
            };

        case 'SIGN_IN':
            localStorage.setItem('t', encode(action.value.token));
            localStorage.setItem('r', encode(action.value.role));
            return {
                ...state,
                loggedin: true,
                token: action.value.token,
                role: action.value.role,
            };

        case 'LOAD_SESSION': {
            let tokenSession = localStorage.getItem('t');
            let roleSession = localStorage.getItem('r');

            try {
                tokenSession = decode(tokenSession);
                roleSession = decode(roleSession);
            } catch (e) {
                localStorage.clear();
                return {
                    ...state,
                    loggedin: false,
                    token: null,
                };
            }

            return {
                ...state,
                loggedin: true,
                token: tokenSession,
                role: parseInt(roleSession),
            };
        }

        case 'EXIT':
            localStorage.clear();
            return {
                ...state,
                loggedin: false,
                token: null,
            };

        default:
            return state;
    }
};

const App = () => (
    <StateProvider initialState={initialState} reducer={reducer}>
        <AppWithLoader />
    </StateProvider>
);

export default App;
