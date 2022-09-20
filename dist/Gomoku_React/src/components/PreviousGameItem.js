"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
function PreviousGameItem(props) {
    const { id } = props;
    const navigate = (0, react_router_dom_1.useNavigate)();
    return (<div>PreviousGameItem

            <button onClick={() => navigate(`gamelog/${id}`)}>
                View Game Log
            </button>
        </div>);
}
exports.default = PreviousGameItem;
