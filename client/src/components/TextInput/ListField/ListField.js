import React from "react";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
}));

const ListField = (props) => {
  const classes = useStyles();
  const { arr, field_ref, label, value, parentChangeHandler } = props;
  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-outlined-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        label={label}
        value={value}
        onChange={(ev) => parentChangeHandler(ev, field_ref)}
      >
        {arr.map((item, index) => (
          <MenuItem key={index} value={index}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ListField;
