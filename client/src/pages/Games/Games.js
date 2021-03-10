import React from "react";
import { Route } from "react-router-dom";
import TypeOfGames from "../../components/TypeOfGames";
import Cards from "../../components/Cards";
import GameIFrame from "../../components/GameIFrame";

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
