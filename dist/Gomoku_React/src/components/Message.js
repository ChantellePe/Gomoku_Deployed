"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Message_module_css_1 = __importDefault(require("./Message.module.css"));
function Message({ variant, message }) {
    return <div className={`${Message_module_css_1.default.message} ${Message_module_css_1.default[variant]}`}>{message}</div>;
}
exports.default = Message;
