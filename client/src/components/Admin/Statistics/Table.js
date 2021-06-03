import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import TableStatsQuiz from "./TableStatsQuiz";
import TableStats from "./TableStats";

const Table = (props) => {
  const { setGame, gameStats } = props;
  const { gameType, gameId } = useParams();

  useEffect(() => {
    setGame(gameId);
  }, [gameId]);

  let table = "";
  if (gameType === "quiz") {
    table = <TableStatsQuiz gameData={gameStats} />;
  } else {
    table = <TableStats gameData={gameStats} />;
  }

  return <>{table}</>;
};

export default Table;
