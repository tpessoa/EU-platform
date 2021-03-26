import React, { useState } from "react";
import SelectGame from "../SelectGame";
import GamesTable from "../GamesTable";

const EditGames = (props) => {
  const { gamesNames } = props;
  const [selectedGame, setSelectedGame] = useState(null);

  return (
    <div>
      <SelectGame gamesNames={gamesNames} setSelectedGame={setSelectedGame} />
      {selectedGame && <GamesTable selectedGame={selectedGame} />}
    </div>
  );
};

export default EditGames;
