import React from 'react';
import { shallow } from 'enzyme';
import MenuButton from './MenuButton';

describe('MenuButton', () => {
    let wrapper;
    const onClick = jest.fn();

    it('should render ok', () => {
        wrapper = shallow(<MenuButton onClick={onClick} />);
        expect(wrapper.debug()).toMatchSnapshot();
    });

    it('should call callback', () => {
        wrapper = shallow(<MenuButton onClick={onClick} />);
        wrapper.simulate('click');
        expect(onClick).toBeCalledTimes(1);
    });
});
