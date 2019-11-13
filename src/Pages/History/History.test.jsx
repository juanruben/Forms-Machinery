import React from 'react';
import { shallow } from 'enzyme';
import History from './History';

test('should render ok', () => {
    const wrapper = shallow(<History />);
    expect(wrapper.debug()).toMatchSnapshot();
});
