import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import App from './App';
import AppRouter from './AppRouter';

describe('App', () => {
    let wrapper;
    beforeEach(() => { wrapper = shallow(<App />); });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('should render the AppRouter Component', () => {
        expect(wrapper.containsMatchingElement(<AppRouter />)).toEqual(true);
    });
});
