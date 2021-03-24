import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import ListGames from "../../components/Admin/ListGames";
import GamesCRUD from "../../components/Admin/GamesCRUD";
import Upload from "../../components/Admin/UploadMain";
import AssetsList from "../../components/Admin/AssetsList";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { ptPT } from "@material-ui/core/locale";

import { puzzleCRUD } from "./games/Data";

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
      <Route exact path="/admin/games" component={ListGames} />
      <Route
        exact
        path="/admin/games/edit/:game"
        component={() => <GamesCRUD gamesInfo={puzzleCRUD} />}
      />

      <Route path="/admin/upload" component={Upload} />
      <Route path="/admin/upload/:game" component={AssetsList} />
    </ThemeProvider>
  );
};

export default Admin;
