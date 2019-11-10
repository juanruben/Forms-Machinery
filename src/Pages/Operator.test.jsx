import React from 'react';
import { shallow } from 'enzyme';
import Operator from './Operator';

test('should render ok', () => {
    const wrapper = shallow(<Operator />);
    expect(wrapper.debug()).toMatchSnapshot();
});
