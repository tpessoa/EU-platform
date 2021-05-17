import React, { forwardRef } from "react";
import TextField from "@material-ui/core/TextField";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1, 0, 1, 0),
    padding: theme.spacing(0, 1, 0, 1),
  },
}));

const Input = forwardRef((props, ref) => {
  const classes = useStyles();
  return (
    <TextField
      variant="outlined"
      margin="normal"
      inputRef={ref}
      fullWidth
      {...props}
    />
  );
});

export default Input;
