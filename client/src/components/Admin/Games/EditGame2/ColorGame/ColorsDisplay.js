import React from "react";
import { IconButton, MenuItem, Paper, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import ColorDisplay from "./ColorDisplay";

const useStyles = makeStyles((theme) => ({
  color: {
    display: "grid",
    gridTemplateColumns: "1fr 3fr 1fr",
    placeItems: "center",
  },
}));

const ColorsDisplay = (props) => {
  const classes = useStyles();
  const { index, item, remove, setValue, error } = props;
  setValue(`config.colors.${index}.code`, item.code);
  return (
    <div className={classes.color}>
      <ColorDisplay color={item.code} />
      {item.code}
      <IconButton aria-label="delete" onClick={() => remove(index)}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default ColorsDisplay;
