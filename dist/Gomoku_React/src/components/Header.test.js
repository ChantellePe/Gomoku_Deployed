"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
const Header_1 = __importDefault(require("./Header"));
const react_router_dom_1 = require("react-router-dom");
beforeAll(() => {
    jest.mock('./Header');
});
describe('Header component', () => {
    it('should render the title and welcome message', () => {
        (0, react_2.render)(<react_router_dom_1.BrowserRouter><Header_1.default /></react_router_dom_1.BrowserRouter>);
        expect(react_2.screen.getByText('Gomoku')).toBeInTheDocument();
        expect(react_2.screen.getByTestId('no name')).toBeInTheDocument();
    });
    it('should have Login button on home page', () => {
        (0, react_2.render)(<react_router_dom_1.BrowserRouter><Header_1.default /></react_router_dom_1.BrowserRouter>);
        expect(react_2.screen.getByText('Log In')).toBeInTheDocument();
    });
    it('should have Sign Up Button on Login Page', () => {
        (0, react_2.render)(<react_router_dom_1.BrowserRouter><Header_1.default /></react_router_dom_1.BrowserRouter>);
        const button = react_2.screen.getByText('Log In');
        react_2.fireEvent.click(button);
        expect(react_2.screen.getByText('Sign Up')).toBeInTheDocument();
    });
});
