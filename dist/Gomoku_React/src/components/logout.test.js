"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
const logout_1 = __importDefault(require("./logout"));
const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => (Object.assign(Object.assign({}, jest.requireActual('react-router-dom')), { useNavigate: () => mockUseNavigate })));
const mockUseContext = jest.fn();
react_1.default.useContext = mockUseContext;
describe('Log out button', () => {
    it('should appear on the page if the user is logged in', () => {
        mockUseContext.mockReturnValue({ user: { username: 'user' } });
        (0, react_2.render)(<logout_1.default />);
        expect(react_2.screen.getByText('Log out')).toBeInTheDocument();
    });
    it('should not appear on the page if the user is not logged in', () => {
        mockUseContext.mockReturnValue({ user: undefined });
        (0, react_2.render)(<logout_1.default />);
        expect(react_2.screen.queryByRole('button')).not.toBeInTheDocument();
    });
});
afterEach(() => {
    mockUseContext.mockReset();
});
