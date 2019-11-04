import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import App from './App';
import AppRouter from './AppRouter';

describe('App', () => {
    let wrapper = shallow(<App />);

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    wrapper = shallow(<App />);

    it('should render the AppRouter Component', () => {
        expect(wrapper.containsMatchingElement(<AppRouter />)).toEqual(true);
    });
});
