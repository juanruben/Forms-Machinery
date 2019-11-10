import React from 'react';
import { shallow } from 'enzyme';
import Main from './Main';

test('should render ok', () => {
    const wrapper = shallow(<Main />);
    expect(wrapper.debug()).toMatchSnapshot();
});
