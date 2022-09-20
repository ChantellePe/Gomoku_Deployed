"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const components_1 = require("../components");
const user_json_1 = __importDefault(require("../data/user.json"));
const Login_module_css_1 = __importDefault(require("./Login.module.css"));
function SignUp() {
    const [username, setUsername] = (0, react_1.useState)('');
    const [password, setPassword] = (0, react_1.useState)('');
    const [confirmPassword, setConfirmPassword] = (0, react_1.useState)('');
    const [errorMessage, setErrorMessage] = (0, react_1.useState)('');
    const usernameInput = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        if (usernameInput.current) {
            usernameInput.current.focus();
        }
    }, []);
    const handleSignUp = () => {
        if (user_json_1.default.find((u) => u.username === username)) {
            setErrorMessage(`Username ${username} has been taken`);
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }
        else {
            console.log({
                username,
                password,
            });
        }
    };
    return (<form className={Login_module_css_1.default.container} onSubmit={(e) => {
            e.preventDefault();
            handleSignUp();
        }}>
            {errorMessage && <components_1.Message variant="error" message={errorMessage}/>}
            <components_1.Input ref={usernameInput} name="username" placeholder="Username" value={username} onChange={(e) => {
            setUsername(e.target.value);
        }}/>
            <components_1.Input name="password" type="password" placeholder="Password" value={password} onChange={(e) => {
            setPassword(e.target.value);
        }}/>

            <components_1.Input name="confirmPassword" type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => {
            setConfirmPassword(e.target.value);
        }}/>
            <components_1.Button type="submit" disabled={!username || !password || !confirmPassword}>
                Sign Up
            </components_1.Button>
        </form>);
}
exports.default = SignUp;
