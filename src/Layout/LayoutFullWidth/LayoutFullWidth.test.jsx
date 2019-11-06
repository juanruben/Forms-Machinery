import React from 'react';
import { shallow } from 'enzyme';
import LayoutFullWidth from './LayoutFullWidth';

describe('LayoutFullWidth', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<LayoutFullWidth />);
    });

    it('should render correctly', () => expect(wrapper.debug()).toMatchSnapshot());

    it('should render divs', () => {
        expect(wrapper.find('div')).toHaveLength(2);
    });
});
