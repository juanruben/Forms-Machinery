import React from 'react';
import { shallow } from 'enzyme';
import Page404 from './Page404';

test('should render ok', () => {
    const wrapper = shallow(<Page404 />);
    expect(wrapper.debug()).toMatchSnapshot();
});
