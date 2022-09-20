"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const components_1 = require("../components");
const context_1 = require("../context");
const Login_module_css_1 = __importDefault(require("./Login.module.css"));
function Login() {
    const { login } = (0, react_1.useContext)(context_1.UserContext);
    //const { boardSize } = useContext(GameContext)
    const usernameInput = (0, react_1.useRef)(null);
    const [username, setUsername] = (0, react_1.useState)('');
    const [password, setPassword] = (0, react_1.useState)('');
    const [errorMessage, setErrorMessage] = (0, react_1.useState)('');
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleLogin = () => __awaiter(this, void 0, void 0, function* () {
        setErrorMessage('');
        const result = yield login(username, password);
        if (result === true) {
            navigate('/');
        }
        else {
            setErrorMessage(result);
        }
    });
    (0, react_1.useEffect)(() => {
        if (usernameInput.current) {
            usernameInput.current.focus();
        }
    }, []);
    return (<form className={Login_module_css_1.default.container} onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
        }}>
            {errorMessage && <components_1.Message variant="error" message={errorMessage}/>}
            <components_1.Input ref={usernameInput} name="username" placeholder="Username" value={username} onChange={(e) => {
            setUsername(e.target.value);
            setErrorMessage('');
        }}/>

            <components_1.Input name="password" type="password" placeholder="Password" value={password} onChange={(e) => {
            setUsername(e.target.value);
            setErrorMessage('');
        }}/>

            <components_1.Button type="submit">Login</components_1.Button>

        </form>);
}
exports.default = Login;
