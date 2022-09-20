"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Square_module_css_1 = __importDefault(require("./Square.module.css"));
const constants_1 = require("../constants");
const context_1 = require("../context");
const react_router_dom_1 = require("react-router-dom");
exports.default = (0, react_1.memo)(function Square(props) {
    const location = (0, react_router_dom_1.useLocation)();
    const { playerMove, resetButtonClicked, classes, isOccupied = false } = props;
    const [status, setStatus] = (0, react_1.useState)(!isOccupied ? constants_1.SQUARE_STATUS.AVAILABLE : constants_1.SQUARE_STATUS.OCCUPIED);
    const [classList, setClassList] = (0, react_1.useState)([`${Square_module_css_1.default.square}`]);
    const { playerTurn, nextTurn } = (0, react_1.useContext)(context_1.SquareContext);
    (0, react_1.useEffect)(() => {
        setStatus(constants_1.SQUARE_STATUS.AVAILABLE);
        setClassList([`${Square_module_css_1.default.square}`]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resetButtonClicked]);
    const handleClick = () => {
        const className = Square_module_css_1.default.square;
        if ((status === constants_1.SQUARE_STATUS.AVAILABLE) && (playerTurn === constants_1.PLAYER.PLAYER_ONE)) {
            playerMove();
            setStatus(constants_1.SQUARE_STATUS.OCCUPIED);
            setClassList([`${className} ${Square_module_css_1.default.occupied} ${Square_module_css_1.default.Black}`]);
            nextTurn(constants_1.PLAYER.PLAYER_TWO);
        }
        else if ((status === constants_1.SQUARE_STATUS.AVAILABLE) && (playerTurn === constants_1.PLAYER.PLAYER_TWO)) {
            playerMove();
            setStatus(constants_1.SQUARE_STATUS.OCCUPIED);
            setClassList([`${className} ${Square_module_css_1.default.occupied} ${Square_module_css_1.default.White}`]);
            nextTurn(constants_1.PLAYER.PLAYER_ONE);
        }
        else {
            return setStatus(constants_1.SQUARE_STATUS.AVAILABLE);
        }
    };
    return (<div className={location.pathname === '/game' ? classList.join(" ") : classes} data-testid='square' onClick={handleClick}>{props.children}</div>);
});
