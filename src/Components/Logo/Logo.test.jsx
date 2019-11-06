import React from 'react';
import { shallow } from 'enzyme';
import Logo from './Logo';

describe('Logo', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Logo />);
    });

    it('should render correctly', () => expect(wrapper.debug()).toMatchSnapshot());

    it('should render div', () => {
        expect(wrapper.find('div')).toHaveLength(1);
    });

    it('should render img', () => {
        expect(wrapper.find('img')).toHaveLength(1);
    });
});
