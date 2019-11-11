import React from 'react';
import { shallow } from 'enzyme';
import Title from './Title';

describe('Title', () => {
    let wrapper;

    it('should render like snapshot', () => {
        wrapper = shallow(<Title text="Test" />);
        expect(wrapper.debug()).toMatchSnapshot();
    });
});
