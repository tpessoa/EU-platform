import React, { useState } from "react";
import { useRouteMatch, Route } from "react-router-dom";

import Error from "../../UI/Error";
import Loading from "../../UI/Loading";
import SelectGame from "./SelectGame";
import { useGamesStats } from "../../../hooks/useGames";

import TableStats from "./TableStats";

const getGameStats = (arr, gameId) => {
  return arr.find((elem) => elem.game_id === gameId);
};

const Statistics = () => {
  const { path, url } = useRouteMatch();
  const gamesStats = useGamesStats();
  const [selectedGame, setSelectedGame] = useState(null);

  if (gamesStats.isLoading) return <Loading />;
  if (gamesStats.isError) return <Error error={gamesStats.error} />;

  return (
    <>
      <SelectGame gamesId={gamesStats.data} gameId={selectedGame} />
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
