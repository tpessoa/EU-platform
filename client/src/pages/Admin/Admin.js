import React from "react";
import { Route } from "react-router-dom";

import Dashboard from "../../components/Admin/Dashboard";
import EditGames from "../../components/Admin/EditGames";
import EditGame from "../../components/Admin/EditGame";
import GamesTable from "../../components/Admin/GamesTable";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { ptPT } from "@material-ui/core/locale";

import { gamesIDsRefs, processInfoMessages } from "./games/Data";

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
        path="/admin/games"
        component={() => (
          <EditGames gamesNames={gamesIDsRefs} messages={processInfoMessages} />
        )}
      />
      <Route
        exact
        path="/admin/edit/game/:gameRef"
        component={() => <EditGame gamesNames={gamesIDsRefs} />}
      />
    </ThemeProvider>
  );
};

export default Admin;
