import React, { useState } from "react";
import { Route } from "react-router-dom";
import styled from "styled-components";

import SelectGame from "../SelectGame";
import GamesTable from "../GamesTable";
import SnackbarCustom from "../../Snackbar";

const EditGames = (props) => {
  const { gamesNames, messages } = props;
  const [selectedGame, setSelectedGame] = useState(null);

  return (
    <Container>
      <SelectGame gamesNames={gamesNames} selectedGame={selectedGame} />
      <Route
        path="/admin/games/:game"
        component={() => (
          <GamesTable gamesNames={gamesNames} setGame={setSelectedGame} />
        )}
      />
      <Route
        path="/admin/games/:game/:snackbar"
        component={() => (
          <SnackbarCustom setGame={setSelectedGame} messages={messages} />
        )}
      />
    </Container>
  );
};

export default EditGames;

const Container = styled.div``;
