import React from "react";
import { Route } from "react-router-dom";
import TypeOfGames from "../../components/Games/TypeOfGames";
import Cards from "../../components/Games/Cards";
import GameIFrame from "../../components/Games/GameIFrame";
import { gamesIDsRefs } from "../Admin/games/Data";

const Games = () => {
  return (
    <>
      <TypeOfGames />
      <Route
        path="/games/:game"
        component={() => <Cards gamesInfo={gamesIDsRefs} />}
      />
      <Route path="/games/:game/:gameId" component={GameIFrame} />
    </>
  );
};

export default Games;
