import React, { useState } from "react";
import { Route } from "react-router-dom";

import SelectGame from "../SelectGame";
import GamesTable from "../GamesTable";

const EditGames = (props) => {
  const { gamesNames } = props;

  const [selectedGame, setSelectedGame] = useState(null);

  console.log(selectedGame);

  return (
    <div>
      <SelectGame gamesNames={gamesNames} selectedGame={selectedGame} />
      <Route
        path="/admin/games/:game"
        component={() => (
          <GamesTable gamesNames={gamesNames} setGame={setSelectedGame} />
        )}
      />
    </div>
  );
};

export default EditGames;
