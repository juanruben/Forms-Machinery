import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';
import Layout from '../../Layout/LayoutFullWidth/LayoutFullWidth';
import Logo from '../../Components/Logo/Logo';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';

// jest.mock('../Service/LoginApi');

describe('Login', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Login />);
    });

    // it('should render correctly', => expect(wrapper.debug()).toMatchSnapshot());

    // it('test api', (done) => {
    //     console.log("holiholi");
    //     setTimeout(() => {
    //         wrapper.setState({ username: 'testtest', password: 'testtest' });
    //         wrapper.instance().login();
    //         wrapper.update();
    //         expect(wrapper.find('div')).toHaveLength(1);
    //         done();
    //     });
    // });

    // it('username check', () => {
    //     console.log("AQUI", wrapper.debug());
    //     const aaa = wrapper.find('input');//.simulate('change', { target: { name: 'username', value: 'krishankantsinghal' } });
    //     console.log("AQUI", aaa.debug());
    //     // expect(wrapper.state('username')).toEqual('krishankantsinghal');
    // });

    it('should update state', () => {
        wrapper.instance().handleInputChange({ target: { name: 'username', value: 'test' } });
        expect(wrapper.state('username')).toEqual('test');
        wrapper.instance().handleInputChange({ target: { name: 'password', value: 'test2' } });
        expect(wrapper.state('password')).toEqual('test2');
    });

    it('should validate', () => {
        wrapper.setState({ username: 'test', password: 'test' });
        expect(wrapper.instance().handleValidation()).toBe(true);
        wrapper.setState({ username: '' });
        expect(wrapper.instance().handleValidation()).toBe(false);
        wrapper.setState({ password: '' });
        expect(wrapper.instance().handleValidation()).toBe(false);
    });

    it('should have a full width container', () => {
        expect(wrapper.find(Layout)).toHaveLength(1);
    });

    it('should have a logo and two inputs', () => {
        expect(wrapper.find(Logo)).toHaveLength(1);
        expect(wrapper.find(Input)).toHaveLength(2);
        expect(wrapper.find(Button)).toHaveLength(1);
    });
});
