"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@testing-library/react");
const useLocalStorage_1 = __importDefault(require("./useLocalStorage"));
const key = 'stored-value';
const initialState = [0, 1, 2];
describe('useLocalStorage hook', () => {
    it('should return the initialState', () => {
        const { result } = (0, react_1.renderHook)(() => (0, useLocalStorage_1.default)(key, initialState));
        const [storedValue] = result.current;
        expect(storedValue).toEqual(initialState);
    });
    it('should return a setValue function that can store the value as serialised json in local storage', () => {
        const { result } = (0, react_1.renderHook)(() => (0, useLocalStorage_1.default)(key, initialState));
        const [, setValue] = result.current;
        const newValue = [1, 2];
        (0, react_1.act)(() => {
            setValue(newValue);
        });
        const [storedValue] = result.current;
        expect(storedValue).toEqual(newValue);
        expect(localStorage.getItem(key)).toEqual(JSON.stringify(newValue));
    });
});
