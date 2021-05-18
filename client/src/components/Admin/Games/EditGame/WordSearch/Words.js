import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  TextField,
  IconButton,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { Controller } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    gridTemplateColumns: "6fr 1fr",
  },
  paper: {
    margin: theme.spacing(2, 0, 2, 0),
    padding: theme.spacing(0, 1, 0, 1),
  },
  heading: {
    textAlign: "center",
  },
  margin: {
    margin: theme.spacing(1),
  },
  formControl: {
    width: "100%",
  },
  text: {
    width: "100%",
  },
}));

const Words = (props) => {
  const classes = useStyles();
  const { index, item, control, register, remove, error } = props;

  console.log(error);
  return (
    <div className={classes.root}>
      <Controller
        name={`config.words.${index}.word`}
        control={control}
        defaultValue={`${item.word}`}
        render={({ field }) => (
          <FormControl
            error={!!error?.word}
            className={classes.formControl}
            fullWidth={true}
          >
            <FormControlLabel
              control={
                <TextField
                  className={classes.text}
                  {...field}
                  type="text"
                  variant="outlined"
                  margin="normal"
                />
              }
            />
            <FormHelperText>{error?.word?.message}</FormHelperText>
          </FormControl>
        )}
      />
      <IconButton
        aria-label="delete"
        className={classes.margin}
        onClick={() => remove(index)}
      >
        <DeleteIcon />
      </IconButton>
    </div>
  );
};
export default Words;
