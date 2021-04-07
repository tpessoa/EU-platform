import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import NavigationIcon from "@material-ui/icons/Navigation";
import Fab from "@material-ui/core/Fab";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Fab variant="extended" component={Link} to={"/admin/games"}>
        <NavigationIcon className={classes.extendedIcon} />
        Gerir Jogos
      </Fab>
      <Fab variant="extended" component={Link} to={"/admin/videos"}>
        <NavigationIcon className={classes.extendedIcon} />
        Gerir Vídeos
      </Fab>
    </div>
  );
};

export default Dashboard;
