import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';

describe('<Button />', () => {
    let wrapper;
    let callback;
    beforeEach(() => {
        callback = jest.fn();
        wrapper = shallow(<Button onClick={callback} />);
    });

    it('should render correctly', () => expect(wrapper.debug()).toMatchSnapshot());

    it('should render button', () => {
        expect(wrapper.find('button')).toHaveLength(1);
    });

    it('should render text', () => {
        wrapper.setProps({ text: 'test' });
        expect(wrapper.text()).toEqual('test');
    });

    it('should call function callback', () => {
        const button = wrapper.find('button');
        button.simulate('click');
        expect(callback).toHaveBeenCalled();
    });
});
