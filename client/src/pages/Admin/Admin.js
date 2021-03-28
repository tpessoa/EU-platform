import React from "react";
import { Route } from "react-router-dom";

import Dashboard from "../../components/Admin/Dashboard";
import EditGames from "../../components/Admin/EditGames";
import EditGame from "../../components/Admin/EditGame";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { ptPT } from "@material-ui/core/locale";

import {
  gamesIDsRefs,
  defaultGameEdit,
  gameEdit,
  puzzleCreateDefault,
  puzzleCRUD,
} from "./games/Data";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1e3c72",
      mainGradient: "linear-gradient(to right,  #2a5298, #1e3c72)",
      mainGradient: "-webkit-linear-gradient(to right,  #2a5298, #1e3c72)",
    },
  },
  ptPT,
});

const Admin = () => {
  return (
    <ThemeProvider theme={theme}>
      <Route exact path="/admin" component={Dashboard} />
      <Route
        exact
        path="/admin/games"
        component={() => <EditGames gamesNames={gamesIDsRefs} />}
      />
      <Route
        exact
        path="/admin/edit/game/:gameRef"
        component={() => (
          <EditGame
            gamesNames={gamesIDsRefs}
            gameInfo={gameEdit}
            gameInfoDefault={defaultGameEdit}
            puzzleInfo={puzzleCRUD}
            puzzleDefault={puzzleCreateDefault}
          />
        )}
      />
    </ThemeProvider>
  );
};

export default Admin;
