import React from 'react';
import { shallow } from 'enzyme';
import Box from './Box';

describe('<Box />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Box />);
    });

    it('should render correctly', () => expect(wrapper.debug()).toMatchSnapshot());

    it('should render divs', () => {
        expect(wrapper.find('div')).toHaveLength(1);
    });
});
