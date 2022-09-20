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
Object.defineProperty(exports, "__esModule", { value: true });
const context_1 = require("../context");
const hooks_1 = require("../hooks");
const http_1 = require("../utils/http");
function UserProvider({ children }) {
    const [user, setUser] = (0, hooks_1.useLocalStorage)('user', undefined);
    if (user) {
        (0, http_1.setToken)(user.token);
    }
    const login = (username, password) => __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, http_1.post)('/login', {
                username,
                password,
            });
            setUser(user);
            (0, http_1.setToken)(user.token);
            return true;
        }
        catch (error) {
            if (error instanceof Error) {
                return error.message;
            }
            return 'Unable to login at this moment, please try again';
        }
    });
    const signup = (username, password) => __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, http_1.post)('/signup', {
                username,
                password,
            });
            setUser(user);
            (0, http_1.setToken)(user.token);
            return true;
        }
        catch (error) {
            if (error instanceof Error) {
                return error.message;
            }
            return 'Unable to login at this moment, please try again';
        }
    });
    const logout = () => {
        setUser(undefined);
        (0, http_1.setToken)('');
    };
    return (<context_1.UserContext.Provider value={{ user, login, signup, logout }}>
            {children}
        </context_1.UserContext.Provider>);
}
exports.default = UserProvider;
