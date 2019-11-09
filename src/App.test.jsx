import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App, { reducer } from './App';
import AppWithLoader from './AppWithLoader';
import { encode } from './Service/Utils';


describe('App', () => {
    let wrapper;
    beforeEach(() => { wrapper = shallow(<App />); });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('should render the AppWithLoader Component', () => {
        expect(wrapper.containsMatchingElement(<AppWithLoader />)).toEqual(true);
    });

    it('should update loading', () => {
        const expectedAction = {
            type: 'SET_LOADING',
            value: true,
        };
        expect(reducer({}, expectedAction)).toEqual({ loading: true });
    });

    it('should load session', () => {
        localStorage.clear();
        localStorage.setItem('t', encode('test'));
        localStorage.setItem('r', encode('1'));
        const expectedAction = {
            type: 'LOAD_SESSION',
        };
        expect(reducer({}, expectedAction)).toEqual({ loggedin: true, token: 'test', role: 1 });
    });

    it('should not load session', () => {
        localStorage.clear();
        localStorage.setItem('t', 'test');
        localStorage.setItem('r', '1');
        const expectedAction = {
            type: 'LOAD_SESSION',
        };
        expect(reducer({}, expectedAction)).toEqual({ loggedin: false, token: null });
    });

    it('should not load session', () => {
        localStorage.clear();
        const expectedAction = {
            type: 'LOAD_SESSION',
        };
        expect(reducer({}, expectedAction)).toEqual({ loggedin: false, token: null });
    });

    it('should signin', () => {
        const expectedAction = {
            type: 'SIGN_IN',
            value: { token: 'test', role: 1 },
        };
        expect(reducer({}, expectedAction)).toEqual({ loggedin: true, token: 'test', role: 1 });
    });

    it('should signout', () => {
        const expectedAction = {
            type: 'EXIT',
            value: true,
        };
        expect(reducer({}, expectedAction)).toEqual({ loggedin: false, token: null });
    });

    it('should update undefined state', () => {
        const expectedAction = {
            type: 'test',
            value: undefined,
        };
        expect(reducer({}, expectedAction)).toEqual({ loading: undefined });
    });
});
