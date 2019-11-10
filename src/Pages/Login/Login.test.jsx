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
        const spyValidation = jest.spyOn(wrapperLogin.instance(), 'validForm');
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
        expect(wrapperLogin.instance().validForm()).toBe(true);
        wrapperLogin.setState({ username: '' });
        expect(wrapperLogin.instance().validForm()).toBe(false);
        wrapperLogin.setState({ password: '' });
        expect(wrapperLogin.instance().validForm()).toBe(false);
    });

    it('should have a box container', () => {
        expect(wrapper.find('.box-container')).toHaveLength(1);
    });

    it('should have a logo, two inputs and a button', () => {
        expect(wrapper.find('Logo')).toHaveLength(1);
        expect(wrapper.find('Input')).toHaveLength(2);
        expect(wrapper.find('Button')).toHaveLength(1);
    });

    afterEach(() => wrapper.unmount());
});

describe('Login process', () => {
    it('should log in', (done) => {
        const wrapper = mount(
            <StateProvider initialState={initialState} reducer={reducer}>
                <AppWithLoader />
            </StateProvider>,
        );
        const wrapperLogin = wrapper.find(Login).at(0);
        const spyValidation = jest.spyOn(wrapperLogin.instance(), 'validForm');
        setTimeout(() => {
            act(() => {
                wrapper.update();
                wrapperLogin.setState({ username: 'test', password: 'Test1234' });
                wrapperLogin.instance().handleSignIn();
            });
            expect(spyValidation).toBeCalledTimes(1);
            expect(wrapperLogin.instance().validForm()).toBeTruthy();
            wrapper.update();
            expect(wrapper.render().find('Main')).toBeTruthy();

            wrapper.unmount();

            done();
        });
    });
});
