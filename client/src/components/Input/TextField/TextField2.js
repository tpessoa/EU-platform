import React from "react";
import { TextFieldCustom } from "../Input.elements";

const TextField = (props) => {
  const { label, value, parentChangeHandler, multi } = props;
  const [word, setWord] = React.useState(value);

  const handleChange = (ev) => {
    setWord(ev.target.value);
    parentChangeHandler(ev.target.value);
  };

  return (
    <TextFieldCustom
      required
      id="outlined-required"
      label={label}
      value={word}
      variant="outlined"
      onChange={handleChange}
      multiline={multi}
    />
  );
};

export default TextField;
