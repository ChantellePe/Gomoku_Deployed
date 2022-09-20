"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const Header_module_css_1 = __importDefault(require("./Header.module.css"));
const Button_module_css_1 = __importDefault(require("./Button.module.css"));
require("../index.css");
const react_1 = require("react");
const context_1 = require("../context");
function Header() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { user } = (0, react_1.useContext)(context_1.UserContext);
    const location = (0, react_router_dom_1.useLocation)();
    const getActions = () => {
        if (user) {
            if (location.pathname === '/games' || location.pathname.includes('/gamelog/')) {
                return (<>
                    <button className={Button_module_css_1.default.button} onClick={() => navigate('/')}>Play Again</button>
                </>);
            }
            else {
                return (<>
                    <button className={Button_module_css_1.default.button} onClick={() => navigate('games')}>Previous Games</button>
                </>);
            }
        }
        else {
            return location.pathname !== '/login' ? (<button className={Button_module_css_1.default.button} onClick={() => navigate('login')}>Log In</button>) : <button className={Button_module_css_1.default.button} onClick={() => navigate('signup')}>Sign Up</button>;
        }
    };
    const welcomeMessage = () => {
        return (user) ? (<span data-testid="name" className={Header_module_css_1.default.welcome}>Hi {user.username}! Welcome to...</span>) : (<span data-testid="no name" className={Header_module_css_1.default.welcome}> Welcome to...</span>);
    };
    return (<header>
            <div className={Header_module_css_1.default.container}>
                {welcomeMessage()}
                <react_router_dom_1.Link to="/" className={Header_module_css_1.default.title}>
                    Gomoku
                </react_router_dom_1.Link>
                {getActions()}
            </div>
        </header>);
}
exports.default = Header;
