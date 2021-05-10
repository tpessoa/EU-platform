import React, { Children, forwardRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";

import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    width: 220,
  },
}));

const SelectInput = forwardRef((props, ref) => {
  const classes = useStyles();
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="demo-simple-select-outlined-label">
        {props.label}
      </InputLabel>
      <Select
        className={classes.selectEmpty}
        id="demo-simple-select-outlined"
        value={age}
        onChange={handleChange}
        // label="sdfsdfsd"
        inputRef={ref}
        {...props}
      >
        {props.children}
      </Select>
      {props.error && <FormHelperText>{props.helper}</FormHelperText>}
    </FormControl>
  );
});
export default SelectInput;
