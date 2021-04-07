import React from "react";
import { Route } from "react-router-dom";

import Dashboard from "../../components/Admin/Dashboard";
import EditGames from "../../components/Admin/EditGames";
import EditGame from "../../components/Admin/EditGame";
import EditVideos from "../../components/Admin/Videos/EditVideos";
import Categories from "../../components/Admin/Videos/Categories";
import EditCategory from "../../components/Admin/Videos/EditCategory";

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
      <Route
        path="/admin/videos"
        component={() => <EditVideos messages={processInfoMessages} />}
      />
      <Route
        path="/admin/videoCategories"
        component={() => <Categories messages={processInfoMessages} />}
      />
      <Route
        path="/admin/edit/:categorieId"
        component={() => <EditCategory messages={processInfoMessages} />}
      />
    </ThemeProvider>
  );
};

export default Admin;
