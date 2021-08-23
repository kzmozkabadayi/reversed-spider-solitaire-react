import "./App.css";
import {
  OneSuite,
  Home,
  NotFound,
  GameRules,
} from "./components/pages";
import ScreenController from "./components/ScreenController";
import * as ROUTES from "./utils/routes";

import { BrowserRouter as Router, Switch } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <ScreenController />
      <div className="gameplay">
        <Router basename={process.env.PUBLIC_URL}>
          <Switch>
            <Home exact path={ROUTES.HOME}></Home>
            <OneSuite path={ROUTES.ONESUITE}></OneSuite>
            <GameRules path={ROUTES.GAMERULES}></GameRules>
            <NotFound path="/"></NotFound>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
