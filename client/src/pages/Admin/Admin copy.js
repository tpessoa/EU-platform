import React from "react";
import { Route } from "react-router-dom";
import UploadAndViewImages from "../../components/Admin/UploadMain";
import EditGame from "../../components/Admin/EditGame";
import SelectGame from "../../components/Admin/SelectGame";
import GamesCRUD from "../../components/Admin/GamesCRUD";

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
      <Route path="/admin/games" component={SelectGame} />
      <Route
        exact
        path="/admin/edit/game/:gameRef"
        component={() => <EditGame gamesInfo={puzzleCRUD} />}
      />
      <Route exact path="/admin/upload" component={UploadAndViewImages} />
    </ThemeProvider>
  );
};

export default Admin;
