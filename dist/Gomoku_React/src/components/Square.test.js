"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@testing-library/react");
const react_router_dom_1 = require("react-router-dom");
const Square_1 = __importDefault(require("./Square"));
const testSeatId = [1, 1];
beforeAll(() => {
    jest.mock('./Square');
});
describe('Square component', () => {
    const moveFunction = jest.fn();
    it('should render a Square', () => {
        (0, react_1.render)(<react_router_dom_1.BrowserRouter><Square_1.default id={testSeatId} playerMove={moveFunction}/></react_router_dom_1.BrowserRouter>);
        expect(react_1.screen.getByTestId('square')).toBeInTheDocument();
    });
    it('should appear available', () => {
        (0, react_1.render)(<react_router_dom_1.BrowserRouter><Square_1.default id={testSeatId} playerMove={moveFunction}/></react_router_dom_1.BrowserRouter>);
        expect(react_1.screen.getByTestId('square')).toHaveStyle(`background-color:  rgb(255, 205, 253`);
    });
    it('should change color when clicked', () => {
        (0, react_1.render)(<react_router_dom_1.BrowserRouter><Square_1.default id={testSeatId} playerMove={moveFunction}/></react_router_dom_1.BrowserRouter>);
        react_1.fireEvent.click(react_1.screen.getByTestId('square'));
        expect(react_1.screen.getByTestId('square')).toHaveStyle(`background-color:  rgb(255, 255, 255`);
    });
});
