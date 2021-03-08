import React from "react";
import Cards from "../../Cards/Cards";
import TypeOfGames from "../../TypeOfGames/TypeOfGames";
import { gameObjOne } from "./Data";
import { Route } from "react-router-dom";
const Games = () => {
  return (
    <>
      <TypeOfGames />
      <Route path="/games/:gameType" component={Cards} />
    </>
  );
};

export default Games;
