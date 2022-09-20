"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./App.css");
const components_1 = require("./components");
const pages_1 = require("./pages");
const react_router_dom_1 = require("react-router-dom");
function App() {
    return (<components_1.UserProvider>
      <components_1.SquareProvider>
        <components_1.GameProvider>
          <components_1.Header />
          <main className='main'>
            <react_router_dom_1.Routes>
              <react_router_dom_1.Route path="/" element={<pages_1.Home />}/>
              <react_router_dom_1.Route path="login" element={<pages_1.Login />}/>
              <react_router_dom_1.Route path="game" element={<pages_1.Game />}/>
              <react_router_dom_1.Route path="games" element={<pages_1.Games />}/>
              <react_router_dom_1.Route path="games/:id" element={<pages_1.GameLog />}/>
              <react_router_dom_1.Route path="signup" element={<pages_1.SignUp />}/>
              <react_router_dom_1.Route path="*" element={<react_router_dom_1.Navigate to="/" replace/>}/>
            </react_router_dom_1.Routes>
            <components_1.Logout />
          </main>
        </components_1.GameProvider>
      </components_1.SquareProvider>
    </components_1.UserProvider>);
}
exports.default = App;
