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
exports.del = exports.post = exports.put = exports.get = exports.setToken = void 0;
function http(request) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(request);
        if (!response.ok) {
            throw new Error(yield response.text());
        }
        const headers = response.headers;
        const data = ((_a = headers.get('content-type')) === null || _a === void 0 ? void 0 : _a.includes('json'))
            ? yield response.json()
            : {};
        return data;
    });
}
exports.default = http;
let token = '';
const setToken = (newToken) => (token = newToken);
exports.setToken = setToken;
function get(path) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield http(new Request(path, {
            headers: Object.assign(Object.assign({}, (token && { Authorization: `Bearer ${token}` })), { 'Content-Type': 'application/json' }),
            method: 'get',
        }));
    });
}
exports.get = get;
function put(path, body) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield http(new Request(path, {
            headers: Object.assign(Object.assign({}, (token && { Authorization: `Bearer ${token}` })), { 'Content-Type': 'application/json' }),
            body: JSON.stringify(body),
            method: 'put',
        }));
    });
}
exports.put = put;
function post(path, body) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield http(new Request(path, {
            headers: Object.assign(Object.assign({}, (token && { Authorization: `Bearer ${token}` })), { 'Content-Type': 'application/json' }),
            body: JSON.stringify(body),
            method: 'post',
        }));
    });
}
exports.post = post;
function del(path) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield http(new Request(path, {
            headers: Object.assign(Object.assign({}, (token && { Authorization: `Bearer ${token}` })), { 'Content-Type': 'application/json' }),
            method: 'delete',
        }));
    });
}
exports.del = del;
