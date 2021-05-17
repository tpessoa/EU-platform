import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

const useStyles = makeStyles((theme) => ({
  circle: {
    color: (props) => props.color,
    fontSize: "3rem",
  },
}));

const ColorDisplay = (props) => {
  const classes = useStyles(props);
  return <FiberManualRecordIcon className={classes.circle} />;
};

export default ColorDisplay;
