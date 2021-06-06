import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import DoneIcon from "@material-ui/icons/Done";
import NotListedLocationIcon from "@material-ui/icons/NotListedLocation";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  question: {
    padding: theme.spacing(2),
    background: "#cad470",
  },
}));

const Question = (props) => {
  const { question } = props;
  const classes = useStyles();

  return (
    <>
      {/* <Chip
        icon={<NotListedLocationIcon />}
        label={question}
        clickable
        color="primary"
        variant="outlined"
      /> */}
      <Paper className={classes.question}>{question}</Paper>
    </>
  );
};

export default Question;
