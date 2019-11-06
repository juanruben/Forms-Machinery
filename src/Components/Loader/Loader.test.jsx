import React from 'react';
import { shallow } from 'enzyme';
import Loader from './Loader';

describe('Loader', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Loader />);
    });

    it('should render correctly', () => expect(wrapper.debug()).toMatchSnapshot());

    it('should render divs', () => {
        wrapper.setProps({ visible: true });
        expect(wrapper.find('div')).toHaveLength(2);
    });

    it('should not render divs', () => {
        expect(wrapper.find('div')).toHaveLength(0);
    });
});
