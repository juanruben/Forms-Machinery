import React from 'react';
import { shallow } from 'enzyme';
import Menu from './Menu';

test('should render ok', () => {
    const wrapper = shallow(<Menu items={[]} />);
    expect(wrapper.debug()).toMatchSnapshot();
});
