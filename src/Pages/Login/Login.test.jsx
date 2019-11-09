import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { StateProvider } from '../../State';
import { initialState, reducer } from '../../App';
import AppWithLoader from '../../AppWithLoader';
import Login from './Login';

jest.mock('./../../Service/Api');

describe('Login', () => {
    let wrapper;
    let wrapperLogin;
    beforeEach(() => {
        wrapper = mount(
            <StateProvider initialState={initialState} reducer={reducer}>
                <AppWithLoader />
            </StateProvider>,
        );
        wrapperLogin = wrapper.find(Login).at(0);
    });

    it('should render correctly', () => expect(wrapper.debug()).toMatchSnapshot());

    it('should show and hide loading', () => {
        act(() => {
            wrapperLogin.instance().toggleLoading(true);
        });
        wrapper.update();
        expect(wrapper.find('Loader').prop('visible')).toBeTruthy();
        act(() => {
            wrapperLogin.instance().toggleLoading(false);
        });
        wrapper.update();
        expect(wrapper.find('Loader').prop('visible')).toBeFalsy();
    });

    it('should call functions on login with no data', () => {
        const spyValidation = jest.spyOn(wrapperLogin.instance(), 'handleValidation');
        const spyLoader = jest.spyOn(wrapperLogin.instance(), 'toggleLoading');
        act(() => {
            wrapperLogin.instance().handleSignIn();
        });
        expect(spyValidation).toBeCalledTimes(1);
        expect(spyLoader).toBeCalledTimes(0);
    });

    it('should update state', () => {
        wrapperLogin.instance().handleInputChange({ target: { name: 'username', value: 'test' } });
        expect(wrapperLogin.state('username')).toEqual('test');
        wrapperLogin.instance().handleInputChange({ target: { name: 'password', value: 'test2' } });
        expect(wrapperLogin.state('password')).toEqual('test2');
    });

    it('should validate', () => {
        wrapperLogin.setState({ username: 'test', password: 'Test123' });
        expect(wrapperLogin.instance().handleValidation()).toBe(true);
        wrapperLogin.setState({ username: '' });
        expect(wrapperLogin.instance().handleValidation()).toBe(false);
        wrapperLogin.setState({ password: '' });
        expect(wrapperLogin.instance().handleValidation()).toBe(false);
    });

    it('should have a box container', () => {
        expect(wrapper.find('.box-container')).toHaveLength(1);
    });

    it('should have a logo, two inputs and a button', () => {
        expect(wrapper.find('Logo')).toHaveLength(1);
        expect(wrapper.find('Input')).toHaveLength(3);
        expect(wrapper.find('Button')).toHaveLength(1);
    });

    afterEach(() => wrapper.unmount());
});

describe('Login process', () => {
    let wrapper;
    let wrapperLogin;
    beforeEach(() => {
        wrapper = mount(
            <StateProvider initialState={initialState} reducer={reducer}>
                <AppWithLoader />
            </StateProvider>,
        );
        wrapperLogin = wrapper.find(Login).at(0);
    });

    it('should log in', () => {
        wrapperLogin.setState({ username: 'test', password: 'Test123' });
        const spyValidation = jest.spyOn(wrapperLogin.instance(), 'handleValidation');
        const spyLoader = jest.spyOn(wrapperLogin.instance(), 'toggleLoading');

        act(() => {
            wrapperLogin.instance().handleSignIn();
        });
        expect(spyValidation).toBeCalledTimes(1);
        expect(spyLoader).toBeCalledTimes(2);
        wrapper.update();
        expect(wrapper.render().find('Main')).toBeTruthy();
    });

    afterEach(() => wrapper.unmount());
});
