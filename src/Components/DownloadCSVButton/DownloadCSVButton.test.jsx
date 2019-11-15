import React from 'react';
import { shallow } from 'enzyme';
import DownloadCSVButton from './DownloadCSVButton';

describe('DownloadCSVButton', () => {
    let wrapper;

    it('should render ok', () => {
        wrapper = shallow(<DownloadCSVButton data={[]} filename="test" />);
        expect(wrapper.debug()).toMatchSnapshot();
    });
});
