import React from "react";
import { Route } from "react-router-dom";
import TypeOfGames from "../../components/Games/TypeOfGames";
import Cards from "../../components/Games/Cards";
import GameIFrame from "../../components/Games/GameIFrame";
import { gamesIDsRefs } from "../Admin/games/Data";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { ptPT } from "@material-ui/core/locale";

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

const Games = () => {
  return (
    <ThemeProvider theme={theme}>
      <TypeOfGames />
      <Route
        path="/games/:game"
        component={() => <Cards gamesInfo={gamesIDsRefs} />}
      />
      <Route path="/games/:game/:gameId" component={GameIFrame} />
    </ThemeProvider>
  );
};

export default Games;
