import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../home/Home";
import GameBoard from "../gameBoard/GameBoard";
import Winner from "../winner/Winner";

function GameNav() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        {/*<Route path="/gameBoard" component={GameBoard} />*/}
        {/*<Route path="/winner" component={Winner} />*/}
      </Switch>
    </Router>
  );
}

export default GameNav;
