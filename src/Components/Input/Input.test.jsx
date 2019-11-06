import React from 'react';
import { shallow } from 'enzyme';
import Input from './Input';

describe('Input', () => {
    let wrapper;
    let callback;
    beforeEach(() => {
        callback = jest.fn();
        wrapper = shallow(<Input name="test" onChange={callback} />);
    });

    it('should render correctly', () => expect(wrapper.debug()).toMatchSnapshot());

    it('value check', () => {
        wrapper.find('input').simulate('change', { target: { value: 'test' } });
        expect(callback).toHaveBeenCalled();
    });

    it('should render text', () => {
        wrapper.setProps({ value: 'test' });
        expect(wrapper.find('input').prop('value')).toEqual('test');
    });

    it('should render icon', () => {
        wrapper.setProps({ icon: 'icon' });
        expect(wrapper.find('i')).toHaveLength(1);
    });

    it('should render error correctly', () => {
        wrapper.setProps({ errors: 'test' });
        expect(wrapper.find('i')).toHaveLength(1);
        expect(wrapper.find('input').hasClass('border-error')).toBe(true);
    });

    it('should render input', () => {
        expect(wrapper.find('input')).toHaveLength(1);
    });

    it('should render div', () => {
        expect(wrapper.find('div')).toHaveLength(1);
    });
});
