import React, { useState } from "react";
import { useRouteMatch, Route } from "react-router-dom";

import Error from "../../UI/Error";
import Loading from "../../UI/Loading";
import SelectGame from "./SelectGame";
import { useGames, useGamesStats } from "../../../hooks/useGames";

import TableStats from "./TableStats";

const getGameStats = (arr, gameId) => {
  return arr.find((elem) => elem.game_id === gameId);
};

const Statistics = () => {
  const { path, url } = useRouteMatch();
  const gamesStats = useGamesStats();
  const quizes = useGames("quiz");
  const [selectedGame, setSelectedGame] = useState(null);

  if (gamesStats.isLoading || quizes.isLoading) return <Loading />;
  if (gamesStats.isError || quizes.isError)
    return <Error error={gamesStats.error} />;

  return (
    <>
      <SelectGame allQuizes={quizes.data} gameId={selectedGame} />
      <Route
        path={`${url}/:gameId`}
        component={() => (
          <TableStats
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
