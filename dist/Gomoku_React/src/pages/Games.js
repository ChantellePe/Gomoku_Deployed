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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const components_1 = require("../components");
const Button_module_css_1 = __importDefault(require("../components/Button.module.css"));
const context_1 = require("../context");
const Games_module_css_1 = __importDefault(require("./Games.module.css"));
const http_1 = require("../utils/http");
function Games() {
    const { user } = (0, react_1.useContext)(context_1.UserContext);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [games, setGames] = (0, react_1.useState)([]);
    const fetchGames = () => __awaiter(this, void 0, void 0, function* () {
        const fetchedGames = yield (0, http_1.get)('/games');
        setGames(fetchedGames);
    });
    (0, react_1.useEffect)(() => {
        fetchGames();
    }, []);
    if (!user)
        return <react_router_dom_1.Navigate to='/login'/>;
    return (<div className={Games_module_css_1.default.container}>
            <h1 className={Games_module_css_1.default.header}>
                You have {games.length} {games.length === 1 ? 'game' : 'games'}
            </h1>
            {games.map((key, i) => {
            const noOfGames = games.length;
            const gameId = games[i]._id;
            const winner = games[i].winner;
            const date = games[i].createdAt;
            if (noOfGames === 0)
                return null;
            return (<div id={gameId} className={`${Games_module_css_1.default.list}`} key={gameId}>
                        <p className={Games_module_css_1.default.title}>
                            {`Game #${i} @ ${date}`}
                        </p>
                        <p>
                            {`Winner: ${winner}`}
                        </p>
                        <components_1.Button className={[Button_module_css_1.default.viewLog].join(' ')} onClick={() => navigate(`/games/${gameId}`)}>
                            View Game Log
                        </components_1.Button>
                    </div>);
        })}
        </div>);
}
exports.default = Games;
