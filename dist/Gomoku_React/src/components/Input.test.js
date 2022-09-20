"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@testing-library/react");
const Input_1 = __importDefault(require("./Input"));
describe('Input component', () => {
    it('should render', () => {
        (0, react_1.render)(<Input_1.default></Input_1.default>);
        const input = react_1.screen.getByTestId('input');
        expect(input).toBeInTheDocument();
    });
    it('should have the correct style', () => {
        (0, react_1.render)(<Input_1.default></Input_1.default>);
        const input = react_1.screen.getByTestId('input');
        expect(input).toHaveClass('input');
    });
});
