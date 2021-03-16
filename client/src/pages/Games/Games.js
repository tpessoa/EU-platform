import React from "react";
import { Route } from "react-router-dom";
import TypeOfGames from "../../components/Games/TypeOfGames";
import Cards from "../../components/Games/Cards";
import GameIFrame from "../../components/Games/GameIFrame";

const Games = () => {
  return (
    <>
      <TypeOfGames />
      <Route path="/games/:gameType" component={Cards} />
      <Route path="/games/:gameType/:gameId" component={GameIFrame} />
    </>
  );
};

export default Games;
