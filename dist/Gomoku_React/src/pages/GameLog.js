"use strict";
/* eslint-disable array-callback-return */
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
const context_1 = require("../context");
const Button_module_css_1 = __importDefault(require("../components/Button.module.css"));
const GameLog_module_css_1 = __importDefault(require("./GameLog.module.css"));
const Square_module_css_1 = __importDefault(require("../components/Square.module.css"));
const components_1 = require("../components");
const http_1 = require("../utils/http");
function GameLog() {
    const [game, setGame] = (0, react_1.useState)();
    const { user } = (0, react_1.useContext)(context_1.UserContext);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { id = '' } = (0, react_router_dom_1.useParams)();
    const fetchGame = (id) => __awaiter(this, void 0, void 0, function* () {
        const fetchedGame = yield (0, http_1.get)(`/games/${id}`);
        setGame(fetchedGame);
    });
    (0, react_1.useEffect)(() => {
        fetchGame(id);
    }, [id]);
    const idGenerator = (id, boardSize) => {
        let row = 0;
        let square = 0;
        const index = id + 1;
        if (index > boardSize) {
            if (index % boardSize !== 0) {
                square = id;
                row = Math.floor((id / boardSize));
            }
            else if (index % boardSize === 0) {
                square = id;
                row = (index / boardSize) - 1;
            }
        }
        else if (id < boardSize) {
            square = id;
            row = 0;
        }
        return [square, row];
    };
    const arraysEqual = (a1, a2) => {
        return JSON.stringify(a1) === JSON.stringify(a2);
    };
    if (!user)
        return <react_router_dom_1.Navigate to='/login'/>;
    if (!id)
        return null;
    if (!game)
        return null;
    const winner = game.winner;
    const boardSize = game.boardSize;
    const gameArr = game.gameArray;
    return (<div key="container" className={GameLog_module_css_1.default.container}>
            <h1 key="winner" className={GameLog_module_css_1.default.header}>Winner: {winner}</h1>
            <div key="board" className={GameLog_module_css_1.default.board} id={`Game-${id}`} style={{ gridTemplateColumns: `repeat(${boardSize}, 1fr)` }}>
                {[...Array(boardSize ** 2)].map((e, index) => {
            const classColor = (sqID) => gameArr.map((e, i) => {
                if (arraysEqual(e, sqID)) {
                    if (i === 0 || i % 2 === 0) {
                        return (`${Square_module_css_1.default.square}  ${Square_module_css_1.default.Black} ${GameLog_module_css_1.default.numberWhite}`);
                    }
                    else if (i === 1 || i % 2 === 1) {
                        return ([`${Square_module_css_1.default.square}  ${Square_module_css_1.default.White}`]);
                    }
                }
                else if (!arraysEqual(e, sqID)) {
                    return (`${Square_module_css_1.default.square} ${GameLog_module_css_1.default.available}`);
                }
            });
            const getIndex = (sqID) => gameArr.map((e, i) => {
                if (arraysEqual(e, sqID)) {
                    return i + 1;
                }
            });
            return (<div>
                            <components_1.Square id={idGenerator(index, boardSize)} classes={classColor(idGenerator(index, boardSize)).join(' ')} key={idGenerator(index, boardSize).join(" ")} playerMove={() => null}><div className={`${GameLog_module_css_1.default.numbers}`}>{getIndex(idGenerator(index, boardSize))}</div></components_1.Square>
                        </div>);
        })}
            </div>

            <div className={GameLog_module_css_1.default.buttonSection}>
                <components_1.Button className={Button_module_css_1.default.button} onClick={() => navigate(`/games`)}> Back </components_1.Button>
            </div>
        </div>);
}
exports.default = GameLog;
