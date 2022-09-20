"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Input_module_css_1 = __importDefault(require("./Input.module.css"));
const Input = react_1.default.forwardRef((props, ref) => {
    return (<input ref={ref} className={Input_module_css_1.default.input} type="text" autoComplete="false" data-testid='input' {...props}/>);
});
exports.default = Input;
