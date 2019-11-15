import React from 'react';
import { shallow } from 'enzyme';
import Select from './Select';

describe('Select', () => {
    let wrapper;
    let callback;
    beforeEach(() => {
        callback = jest.fn();
        wrapper = shallow(<Select name="test" onChange={callback} />);
    });

    it('should render correctly', () => expect(wrapper.debug()).toMatchSnapshot());

    it('value check', () => {
        wrapper.find('select').simulate('change', { target: { value: 'test' } });
        expect(callback).toHaveBeenCalled();
    });

    it('should render text', () => {
        wrapper.setProps({ value: 'test' });
        expect(wrapper.find('select').prop('value')).toEqual('test');
    });

    it('should render error correctly', () => {
        wrapper.setProps({ errors: 'test' });
        expect(wrapper.find('i')).toHaveLength(1);
        expect(wrapper.find('select').hasClass('border-error')).toBe(true);
    });

    it('should render input', () => {
        expect(wrapper.find('select')).toHaveLength(1);
    });

    it('should render div', () => {
        expect(wrapper.find('div')).toHaveLength(1);
    });
});
