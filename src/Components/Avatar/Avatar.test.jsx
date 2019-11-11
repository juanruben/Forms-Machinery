import React from 'react';
import { shallow } from 'enzyme';
import Avatar from './Avatar';

describe('Avatar', () => {
    test('should render ok', () => {
        const wrapper = shallow(<Avatar image="test" title="test" />);
        expect(wrapper.debug()).toMatchSnapshot();
    });
});
