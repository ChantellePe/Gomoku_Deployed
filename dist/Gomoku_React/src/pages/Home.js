"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const components_1 = require("../components");
const Home_module_css_1 = __importDefault(require("./Home.module.css"));
const context_1 = require("../context");
const context_2 = require("../context");
const constants_1 = require("../constants");
function Home() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { boardSize, setBoardSize } = (0, react_1.useContext)(context_1.GameContext);
    const { nextTurn } = (0, react_1.useContext)(context_2.SquareContext);
    return (<div className={Home_module_css_1.default.boardForm}>

            <form className={Home_module_css_1.default.boardForm} onSubmit={(e) => {
            e.preventDefault();
            nextTurn(constants_1.PLAYER.PLAYER_ONE);
            navigate('/game');
        }}>
                <select className={Home_module_css_1.default.dropDown} onChange={(e) => {
            setBoardSize(Number(e.target.value));
        }}>
                    <option value={0} hidden>Board Size</option>
                    {(Array.from(Array(20)).map((e, i) => i + 5).map((num) => <option key={num} value={num}>{num}</option>))}
                </select>
                <div className={Home_module_css_1.default.gameRules}>
                    <header className={Home_module_css_1.default.rulesTitle}>Game Rules:</header>
                    <p>Players alternate turns placing a stone of their color on an empty intersection. <br></br><br></br> Black plays first.
                        The winner is the first player to form an unbroken chain of five stones horizontally, vertically, or diagonally.
                        <br></br><br></br>Placing so that a line of more than five stones of the same color is created does not result in a win.</p>
                </div>
                <components_1.Button className={Home_module_css_1.default.startGameButton} type="submit" disabled={boardSize === 0}>
                    Start Game
                </components_1.Button>
            </form>
        </div>);
}
exports.default = Home;
