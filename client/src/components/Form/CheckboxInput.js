import React, { forwardRef } from "react";
import {
  Checkbox,
  FormControl,
  FormLabel,
  Paper,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Controller } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1, 0, 1, 0),
    padding: theme.spacing(0, 1, 0, 1),
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
  },
  formControl: {
    marginRight: theme.spacing(1),
    padding: theme.spacing(1, 0, 1, 0),
  },
  checkboxLabel: {
    textAlign: "center",
    fontSize: "0.9rem",
  },
}));

const CheckboxInput = forwardRef((props, ref) => {
  const classes = useStyles();
  const {
    register,
    control,
    textName,
    textLabel,
    checkboxName,
    checkboxLabel,
    disabled,
    error,
    helperText,
  } = props;
  return (
    <Paper className={classes.root}>
      <FormControl className={classes.formControl}>
        <FormLabel className={classes.checkboxLabel}>{checkboxLabel}</FormLabel>
        <Controller
          name={checkboxName}
          control={control}
          defaultValue={false}
          rules={{ required: true }}
          render={({ field }) => (
            <Checkbox {...field} color="primary" checked={!disabled} />
          )}
        />
      </FormControl>
      <Controller
        name={textName}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            type="number"
            variant="outlined"
            margin="normal"
            error={error}
            helperText={helperText}
            disabled={disabled}
          />
        )}
      />
    </Paper>
  );
});

export default CheckboxInput;
