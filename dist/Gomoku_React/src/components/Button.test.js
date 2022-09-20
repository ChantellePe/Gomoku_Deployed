"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@testing-library/react");
const Button_1 = __importDefault(require("./Button"));
describe('Button component', () => {
    it('should render', () => {
        (0, react_1.render)(<Button_1.default>Test Button</Button_1.default>);
        const button = react_1.screen.getByText('Test Button');
        expect(button).toBeInTheDocument();
    });
    it('should call the click handler function if the user clicks the button', () => {
        const clickHandler = jest.fn();
        (0, react_1.render)(<Button_1.default onClick={clickHandler}>Test Button</Button_1.default>);
        const button = react_1.screen.getByText('Test Button');
        react_1.fireEvent.click(button);
        expect(clickHandler).toBeCalled();
    });
});
