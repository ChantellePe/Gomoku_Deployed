"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable react-hooks/exhaustive-deps */
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const context_1 = require("../context");
const Game_module_css_1 = __importDefault(require("./Game.module.css"));
const components_1 = require("../components");
const constants_1 = require("../constants");
const Button_module_css_1 = __importDefault(require("../components/Button.module.css"));
const hooks_1 = require("../hooks");
const moment_1 = __importDefault(require("moment"));
function gameReducer(state = [], action) {
    const { type, payload } = action;
    switch (type) {
        case constants_1.PLAYER_MOVE_ACTION.SELECT:
            return [...state, payload];
        case constants_1.PLAYER_MOVE_ACTION.RESET:
            return [];
        default:
            return state;
    }
}
function Game() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [gameOver, setGameOver] = (0, react_1.useState)(false);
    const [winner, setWinner] = (0, react_1.useState)(undefined);
    const [resetButtonClicked, setResetButtonClicked] = (0, react_1.useState)(false);
    const { boardSize } = (0, react_1.useContext)(context_1.GameContext);
    const { user } = (0, react_1.useContext)(context_1.UserContext);
    const { playerTurn, nextTurn } = (0, react_1.useContext)(context_1.SquareContext);
    const [games, saveGames] = (0, hooks_1.useLocalStorage)('Games', {});
    const _a = games, _b = `Game-${Object.keys(games).length + 1}`, _c = _a[_b], completedGames = _c === void 0 ? [] : _c, otherGames = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
    const [playerOneState, dispatch1] = (0, react_1.useReducer)(gameReducer, completedGames);
    const [playerTwoState, dispatch2] = (0, react_1.useReducer)(gameReducer, completedGames);
    const location = (0, react_router_dom_1.useLocation)();
    const date = (0, moment_1.default)().format('DD/MM/YYYY');
    const resetGame = () => {
        setResetButtonClicked(() => resetButtonClicked ? false : true);
        dispatch1({ type: constants_1.PLAYER_MOVE_ACTION.RESET, payload: [] });
        dispatch2({ type: constants_1.PLAYER_MOVE_ACTION.RESET, payload: [] });
        nextTurn(constants_1.PLAYER.PLAYER_ONE);
        setGameOver(false);
        setWinner(undefined);
    };
    const getClassNames = (gameOver, winner) => {
        switch (gameOver) {
            case false:
                return `${Game_module_css_1.default.header}`;
            case true && winner === constants_1.PLAYER.PLAYER_ONE:
                return `${Game_module_css_1.default.header} ${Game_module_css_1.default.winnerBlack}`;
            case true && winner === constants_1.PLAYER.PLAYER_TWO:
                return `${Game_module_css_1.default.header} ${Game_module_css_1.default.winnerWhite}`;
            case true && winner === constants_1.PLAYER.TIE:
                return `${Game_module_css_1.default.header} ${Game_module_css_1.default.winnerTie}`;
            default:
                return `${Game_module_css_1.default.header}`;
        }
    };
    (0, react_1.useEffect)(() => {
        resetGame();
    }, [location]);
    (0, react_1.useEffect)(() => {
        function exists(arr, search) {
            return arr.some(row => JSON.stringify(row) === JSON.stringify(search));
        }
        function fiveConseq(squareIds) {
            for (let idx = 0; idx < squareIds.length; idx++) {
                if (exists(squareIds, [squareIds[idx][0], squareIds[idx][1]]) && exists(squareIds, [squareIds[idx][0] + 1, squareIds[idx][1]]) && exists(squareIds, [squareIds[idx][0] + 2, squareIds[idx][1]]) && exists(squareIds, [squareIds[idx][0] + 3, squareIds[idx][1]]) && exists(squareIds, [squareIds[idx][0] + 4, squareIds[idx][1]])) {
                    if (!(exists(squareIds, [squareIds[idx][0] - 1, squareIds[idx][1]])) && (!exists(squareIds, [squareIds[idx][0] + 5, squareIds[idx][1]]))) {
                        return true;
                    }
                }
            }
            return false;
        }
        function fiveDown(squareIds) {
            const number = boardSize;
            for (let idx = 0; idx < squareIds.length; idx++) {
                if (exists(squareIds, [squareIds[idx][0], squareIds[idx][1]]) && exists(squareIds, [squareIds[idx][0] + number, squareIds[idx][1] + 1]) && exists(squareIds, [squareIds[idx][0] + (number * 2), squareIds[idx][1] + 2]) && exists(squareIds, [squareIds[idx][0] + (number * 3), squareIds[idx][1] + 3]) && exists(squareIds, [squareIds[idx][0] + (number * 4), squareIds[idx][1] + 4])) {
                    if (!(exists(squareIds, [squareIds[idx][0] - number, squareIds[idx][1] - 1])) && !(exists(squareIds, [squareIds[idx][0] + (number * 5), squareIds[idx][1] + 5]))) {
                        return true;
                    }
                }
            }
            return false;
        }
        function diagLeft(squareIds) {
            const number = boardSize - 1;
            for (let idx = 0; idx < squareIds.length; idx++) {
                if (exists(squareIds, [squareIds[idx][0], squareIds[idx][1]]) && exists(squareIds, [squareIds[idx][0] + number, squareIds[idx][1] + 1]) && exists(squareIds, [squareIds[idx][0] + (number * 2), squareIds[idx][1] + 2]) && exists(squareIds, [squareIds[idx][0] + (number * 3), squareIds[idx][1] + 3]) && exists(squareIds, [squareIds[idx][0] + (number * 4), squareIds[idx][1] + 4])) {
                    if (!(exists(squareIds, [squareIds[idx][0] - number, squareIds[idx][1] - 1])) && (!exists(squareIds, [squareIds[idx][0] + (number * 5), squareIds[idx][1] + 5]))) {
                        return true;
                    }
                }
            }
            return false;
        }
        function diagRight(squareIds) {
            const number = boardSize + 1;
            for (let idx = 0; idx < squareIds.length; idx++) {
                if (exists(squareIds, [squareIds[idx][0], squareIds[idx][1]]) && exists(squareIds, [squareIds[idx][0] + number, squareIds[idx][1] + 1]) && exists(squareIds, [squareIds[idx][0] + (number * 2), squareIds[idx][1] + 2]) && exists(squareIds, [squareIds[idx][0] + (number * 3), squareIds[idx][1] + 3]) && exists(squareIds, [squareIds[idx][0] + (number * 4), squareIds[idx][1] + 4])) {
                    if (!(exists(squareIds, [squareIds[idx][0] - number, squareIds[idx][1] - 1])) && (!exists(squareIds, [squareIds[idx][0] + (number * 5), squareIds[idx][1] + 5]))) {
                        return true;
                    }
                }
            }
            return false;
        }
        console.log(playerOneState);
        console.log(playerTwoState);
        if (playerOneState.length > 3 && playerTwoState.length > 3) {
            if (playerOneState.length + playerTwoState.length === boardSize ** 2) {
                setWinner(constants_1.PLAYER.TIE);
                setGameOver(true);
            }
            else {
                if (fiveConseq(playerOneState)) {
                    setWinner(constants_1.PLAYER.PLAYER_ONE);
                    setGameOver(true);
                }
                else if (fiveConseq(playerTwoState)) {
                    setWinner(constants_1.PLAYER.PLAYER_TWO);
                    setGameOver(true);
                }
                else if (fiveDown(playerTwoState)) {
                    setWinner(constants_1.PLAYER.PLAYER_TWO);
                    setGameOver(true);
                }
                else if (fiveDown(playerOneState)) {
                    setWinner(constants_1.PLAYER.PLAYER_ONE);
                    setGameOver(true);
                }
                else if (diagLeft(playerTwoState)) {
                    setWinner(constants_1.PLAYER.PLAYER_TWO);
                    setGameOver(true);
                }
                else if (diagLeft(playerOneState)) {
                    setWinner(constants_1.PLAYER.PLAYER_ONE);
                    setGameOver(true);
                }
                else if (diagRight(playerTwoState)) {
                    setWinner(constants_1.PLAYER.PLAYER_TWO);
                    setGameOver(true);
                }
                else if (diagRight(playerOneState)) {
                    setWinner(constants_1.PLAYER.PLAYER_ONE);
                    setGameOver(true);
                }
                else {
                    setWinner(undefined);
                }
            }
            console.log(playerOneState);
            console.log(playerTwoState);
        }
    }, [playerOneState, playerTwoState]);
    if (!user)
        return <react_router_dom_1.Navigate to="/login" replace/>;
    if (!boardSize)
        return null;
    const idGenerator = (id) => {
        let row = 0;
        let square = 0;
        const index = id + 1;
        if (index > boardSize) {
            if (index % boardSize !== 0) {
                square = id;
                row = Math.floor((id / boardSize));
            }
            else if (index % boardSize === 0) {
                row = (index / boardSize) - 1;
                square = id;
            }
        }
        else if (id < boardSize) {
            row = 0;
            square = id;
        }
        return [square, row];
    };
    const announceWinner = () => {
        if (winner === constants_1.PLAYER.PLAYER_ONE) {
            return 'Black WINS!!!';
        }
        else if (winner === constants_1.PLAYER.PLAYER_TWO) {
            return 'White WINS!!!';
        }
        else if (winner === constants_1.PLAYER.TIE) {
            return `It's a TIE!!!`;
        }
        else {
            return winner;
        }
    };
    const getBoardStyles = () => {
        if (gameOver) {
            return `${Game_module_css_1.default.gameOver} ${Game_module_css_1.default.board}`;
        }
        else if (!gameOver) {
            return `${Game_module_css_1.default.board}`;
        }
        return `${Game_module_css_1.default.board}`;
    };
    const mergeArrays = (a1, a2) => {
        let length = a1.length > a2.length ? a1.length : a2.length;
        let a3 = [];
        for (let i = 0; i < length; i++) {
            a3.push(a1[i]);
            a3.push(a2[i]);
        }
        return a3;
    };
    const leave = () => {
        console.log(winner);
        const finalArray = mergeArrays(playerOneState, playerTwoState);
        if (gameOver && finalArray.length > 0) {
            saveGames(Object.assign(Object.assign({}, games), { [`Game-${Object.keys(games).length + 1}-${winner}-${Number(boardSize)}-${date}`]: finalArray }));
            navigate('/games');
        }
        else {
            saveGames(otherGames);
            resetGame();
            navigate('/');
        }
    };
    return (<div className={Game_module_css_1.default.container}>
            <h1 className={getClassNames(gameOver, winner)}>{winner === undefined ? `Current Player: ${playerTurn}` : announceWinner()}</h1>
            <div className={getBoardStyles()} id={`Game-${Object.keys(games).length + 1}`} style={{ gridTemplateColumns: `repeat(${boardSize}, 1fr)` }}>
                {[...Array(boardSize * boardSize)].map((_, index) => (<components_1.Square resetButtonClicked={resetButtonClicked} key={idGenerator(index).join(",")} id={idGenerator(index)} playerTurn={playerTurn} playerMove={() => {
                if (playerTurn === constants_1.PLAYER.PLAYER_ONE) {
                    dispatch1({ type: constants_1.PLAYER_MOVE_ACTION.SELECT, payload: idGenerator(index) });
                }
                else if (playerTurn === constants_1.PLAYER.PLAYER_TWO) {
                    dispatch2({ type: constants_1.PLAYER_MOVE_ACTION.SELECT, payload: idGenerator(index) });
                }
            }}/>))}
            </div>
            <div className={Game_module_css_1.default.buttonSection}>
                <components_1.Button className={[Button_module_css_1.default.button, Button_module_css_1.default.reset].join(' ')} onClick={resetGame}>Restart</components_1.Button>
                <components_1.Button className={[Button_module_css_1.default.button, Button_module_css_1.default.leave].join(' ')} onClick={leave}>Leave</components_1.Button>
            </div>
        </div>);
}
exports.default = Game;
