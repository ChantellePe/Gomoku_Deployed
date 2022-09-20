"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@testing-library/react");
const Message_1 = __importDefault(require("./Message"));
describe('Message component', () => {
    it('should render a message', () => {
        (0, react_1.render)(<Message_1.default variant='error' message='testing'></Message_1.default>);
        const testMessage = react_1.screen.getByText('testing');
        expect(testMessage).toBeInTheDocument();
    });
    it('should have the correct style', () => {
        (0, react_1.render)(<Message_1.default variant='success' message='success'></Message_1.default>);
        const testMessage = react_1.screen.getByText('success');
        expect(testMessage).toHaveClass('success');
    });
});
