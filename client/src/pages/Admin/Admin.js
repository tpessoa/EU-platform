import React from "react";
import { Route, Switch } from "react-router-dom";

import Dashboard from "../../components/Admin/Dashboard";

import EditPoll from "../../components/Admin/Poll/Edit";
import EditWork from "../../components/Admin/Works/Edit";
import EditVideoCategory from "../../components/Admin/Videos/EditCategory";
import EditVideo from "../../components/Admin/Videos/EditVideo";
import EditGame from "../../components/Admin/Games/EditGame";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { ptPT } from "@material-ui/core/locale";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1e3c72",
      mainGradient: "linear-gradient(to right,  #2a5298, #1e3c72)",
      mainGradient: "-webkit-linear-gradient(to right,  #2a5298, #1e3c72)",
    },
    secondary: {
      main: "#fbb034",
      mainGradient: "linear-gradient(315deg, #fbb034 0%, #ffdd00 74%);",
      mainGradient: "-webkit-linear-gradient(315deg, #fbb034 0%, #ffdd00 74%)",
    },
  },
  ptPT,
});

const Admin = () => {
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route
          path="/admin/poll/categories/edit/:id"
          component={() => <EditPoll />}
        />
        <Route
          path="/admin/poll/works/edit/:id"
          component={() => <EditWork />}
        />
        <Route
          path="/admin/videos/categories/edit/:id"
          component={() => <EditVideoCategory />}
        />
        <Route path="/admin/videos/edit/:id" component={() => <EditVideo />} />
        <Route
          path="/admin/games/:type/edit/:id"
          component={() => <EditGame />}
        />
        <Route path="/admin" component={Dashboard} />
      </Switch>
    </ThemeProvider>
  );
};

export default Admin;
