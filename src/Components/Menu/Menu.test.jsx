import React from 'react';
import { shallow } from 'enzyme';
import Menu from './Menu';

describe('Menu', () => {
    it('should render ok', () => {
        const wrapper = shallow(<Menu items={[]} />);
        expect(wrapper.debug()).toMatchSnapshot();
    });

    test('several items', () => {
        const items = [
            {
                id: 1,
                title: 'Dashboard',
                path: '/admin',
            },
            {
                id: 2,
                title: 'Clientes',
                path: '/admin/clientes',
            },
        ];
        const wrapper = shallow(<Menu items={items} />);
        expect(wrapper.find('Link')).toHaveLength(2);
    });

    test('one item', () => {
        const items = [
            {
                id: 1,
                title: 'Dashboard',
                path: '/admin',
            },
        ];
        const wrapper = shallow(<Menu items={items} />);
        expect(wrapper.find('Link')).toHaveLength(1);
    });

    test('zero items', () => {
        const wrapper = shallow(<Menu items={[]} />);
        expect(wrapper.find('Link')).toHaveLength(0);
    });
});
