import React, { forwardRef } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import { makeStyles } from "@material-ui/core/styles";
import { Controller, useFormContext } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1, 0, 1, 0),
    padding: theme.spacing(0, 1, 0, 1),
  },
}));

const CheckBox = forwardRef((props, ref) => {
  const classes = useStyles();

  return (
    <FormControl
      error={props.error}
      className={classes.formControl}
      fullWidth={!props.fullWidth}
    >
      {/* <FormLabel component="legend">Pick two</FormLabel> */}
      <FormControlLabel
        control={
          <Checkbox
            className={classes.root}
            inputRef={ref}
            color="primary"
            checked={props.value || false}
            onChange={(e) => props.onChange(e.target.checked)}
          />
        }
        label={props.label}
      />

      <FormHelperText>{props.helperText}</FormHelperText>
    </FormControl>
  );
});

export default CheckBox;
