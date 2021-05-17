import React, { forwardRef } from "react";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  btn: {
    margin: theme.spacing(1),
  },
  reset: {
    margin: theme.spacing(0),
  },
}));

const ButtonForm = forwardRef((props, ref) => {
  const classes = useStyles();

  return (
    <FormControl
      error={!!props.error}
      fullWidth={!props.fullWidth}
      className={classes.root}
    >
      <FormControlLabel
        className={classes.reset}
        control={
          <Button
            className={classes.btn}
            variant="contained"
            color="secondary"
            {...props}
          >
            {props.children}
          </Button>
        }
      />
      <FormHelperText>{props.helpertext}</FormHelperText>
    </FormControl>
  );
});

export default ButtonForm;
