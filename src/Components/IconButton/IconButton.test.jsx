import React from 'react';
import { shallow } from 'enzyme';
import IconButton from './IconButton';

describe('IconButton', () => {
    let wrapper;
    const onClick = jest.fn();

    it('should render ok', () => {
        wrapper = shallow(<IconButton onClick={onClick} icon="" />);
        expect(wrapper.debug()).toMatchSnapshot();
    });

    it('should call callback', () => {
        wrapper = shallow(<IconButton onClick={onClick} icon="" />);
        wrapper.simulate('click');
        expect(onClick).toBeCalledTimes(1);
    });
});
