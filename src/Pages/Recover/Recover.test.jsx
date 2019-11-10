import React from 'react';
import { mount, shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { StateProvider } from '../../State';
import { initialState, reducer } from '../../App';
import AppWithLoader from '../../AppWithLoader';
import Recover from './Recover';
import Button from '../../Components/Button/Button';

jest.mock('./../../Service/Api');

describe('Recover', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Recover />);
    });

    it('should render correctly', () => expect(wrapper.debug()).toMatchSnapshot());

    it('should test ', () => {
        const mockReducer = jest.fn();
        const wrapper2 = mount(
            <StateProvider initialState={initialState} reducer={mockReducer}>
                <Recover />
            </StateProvider>,
        );
        const wrapperRecover = wrapper2.find(Recover).at(0);
        act(() => {
            wrapperRecover.instance().toggleLoading(false);
        });
        wrapper2.update();
        expect(mockReducer).toHaveBeenCalledTimes(1);
        wrapper2.unmount();
    });

    it('should call validate when send', () => {
        const mockValidate = jest.fn();
        wrapper.instance().validForm = mockValidate;
        wrapper.instance().handleInputChange({ target: { name: 'email', value: 'test@test.com' } });
        wrapper.instance().send();
        expect(mockValidate).toHaveBeenCalledTimes(1);
    });


    it('should show and hide loading', () => {
        const mockToggleLoading = jest.fn();
        wrapper.instance().toggleLoading = mockToggleLoading;
        wrapper.instance().handleInputChange({ target: { name: 'email', value: 'test@test.com' } });
        wrapper.find(Button).props().onClick();
        expect(mockToggleLoading).toHaveBeenCalledTimes(2);
    });

    it('should update state', () => {
        wrapper.instance().handleInputChange({ target: { name: 'email', value: 'test@test.com' } });
        expect(wrapper.state('email')).toEqual('test@test.com');
    });

    it('should validate', () => {
        wrapper.setState({ email: 'test@test.com' });
        expect(wrapper.instance().validForm()).toBe(true);
        wrapper.setState({ email: '' });
        expect(wrapper.instance().validForm()).toBe(false);
    });

    it('should have sent message', () => {
        wrapper.setState({ sent: true });
        expect(wrapper.find('.message-ok')).toHaveLength(1);
    });

    it('should have a logo, two inputs and a button', () => {
        expect(wrapper.find('Logo')).toHaveLength(1);
        expect(wrapper.find('Input')).toHaveLength(1);
        expect(wrapper.find('Button')).toHaveLength(1);
    });

    afterEach(() => wrapper.unmount());
});

// describe('Login process', () => {
//     it('should log in', (done) => {
//         const wrapper = mount(
//             <StateProvider initialState={initialState} reducer={reducer}>
//                 <AppWithLoader />
//             </StateProvider>,
//         );
//         const wrapperRecover = wrapper.find(Login).at(0);
//         const spyValidation = jest.spyOn(wrapperRecover.instance(), 'validForm');
//         setTimeout(() => {
//             act(() => {
//                 wrapper.update();
//                 wrapperRecover.setState({ username: 'test', password: 'Test1234' });
//                 wrapperRecover.instance().handleSignIn();
//             });
//             expect(spyValidation).toBeCalledTimes(1);
//             expect(wrapperRecover.instance().validForm()).toBeTruthy();
//             wrapper.update();
//             expect(wrapper.render().find('Main')).toBeTruthy();

//             wrapper.unmount();

//             done();
//         });
//     });
// });
