import React from 'react';
import { shallow } from 'enzyme';
import Admin from './Admin';

test('should render ok', () => {
    const wrapper = shallow(<Admin />);
    expect(wrapper.debug()).toMatchSnapshot();
});
