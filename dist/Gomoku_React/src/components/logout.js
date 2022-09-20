"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const logout_module_css_1 = __importDefault(require("./logout.module.css"));
const context_1 = require("../context");
function Logout() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { user, logout } = (0, react_1.useContext)(context_1.UserContext);
    if (user) {
        return (<>
            <button className={logout_module_css_1.default.logout} onClick={() => {
                logout();
                navigate('login');
            }}>Log out</button>
        </>);
    }
    else {
        return (null);
    }
}
exports.default = Logout;
