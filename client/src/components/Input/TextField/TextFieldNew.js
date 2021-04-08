import React from "react";
import { TextFieldCustom } from "../Input.elements";

const TextField = (props) => {
  const { field_ref, label, value, parentChangeHandler, multi } = props;
  const [word, setWord] = React.useState(value);

  React.useEffect(() => {
    setWord(value);
  }, [value]);

  const handleChange = (ev) => {
    const userInput = ev.target.value;
    setWord(userInput);
    parentChangeHandler(userInput, field_ref);
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
