import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import DoneIcon from "@material-ui/icons/Done";
import NotListedLocationIcon from "@material-ui/icons/NotListedLocation";
import Paper from "@material-ui/core/Paper";
import MouseIcon from "@material-ui/icons/Mouse";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  container: {
    padding: theme.spacing(2),
    background: "#cad470",
    textAlign: "center",
  },
  countryClick: {
    marginTop: theme.spacing(2),
  },
}));

const Question = (props) => {
  const { question } = props;
  const classes = useStyles();

  return (
    <>
      <Paper className={classes.container}>
        <Typography
          className={classes.question}
          variant="h5"
          component="h2"
          color="primary"
        >
          {question}
        </Typography>
        <Chip
          className={classes.countryClick}
          icon={<MouseIcon />}
          label="Clica no país"
          variant="outlined"
          color="primary"
          deleteIcon={<DoneIcon />}
        />
      </Paper>
    </>
  );
};

export default Question;
