import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
};
global.localStorage = localStorageMock;

configure({ adapter: new Adapter() });

window.matchMedia = jest.fn().mockImplementation((query) => {
    return {
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    };
});
