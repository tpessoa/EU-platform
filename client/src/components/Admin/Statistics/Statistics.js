import React, { useState } from "react";
import { useRouteMatch, Route } from "react-router-dom";

import Error from "../../UI/Error";
import Loading from "../../UI/Loading";
import SelectGame from "./SelectGame";
import { useGames, useAllGames, useGamesStats } from "../../../hooks/useGames";

import TableStatsQuiz from "./TableStatsQuiz";
import TableStats from "./TableStats";
import Table from "./Table";

const getGameStats = (arr, gameId) => {
  return arr.find((elem) => elem.game_id === gameId);
};

const filterAllgames = (arr) => {
  const availableGameStats = ["puzzle", "quiz", "wordSearch", "memory"];
  const newArr = [];
  for (const game of arr) {
    if (availableGameStats.includes(game.game_ref_name)) {
      newArr.push(game);
    }
  }
  return newArr;
};

const Statistics = () => {
  const { path, url } = useRouteMatch();
  const gamesStats = useGamesStats();
  const allGames = useAllGames();
  const [selectedGame, setSelectedGame] = useState(null);

  if (gamesStats.isLoading || allGames.isLoading) return <Loading />;
  if (gamesStats.isError || allGames.isError)
    return <Error error={gamesStats.error} />;

  // filter all games
  allGames.data = filterAllgames(allGames.data);

  // let table = "";
  // if (selectedGame === "quiz") {
  //   table = (
  //     <TableStatsQuiz

  //     />
  //   );
  // } else {
  //   table = <TableStats />;
  // }

  return (
    <>
      <SelectGame allGames={allGames.data} gameId={selectedGame} />
      <Route
        path={`${url}/:gameType/:gameId`}
        component={() => (
          <Table
            setGame={setSelectedGame}
            gameStats={
              selectedGame ? getGameStats(gamesStats.data, selectedGame) : null
            }
          />
        )}
      />
    </>
  );
};

export default Statistics;
