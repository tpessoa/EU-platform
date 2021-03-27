import React from "react";
import { TextFieldCustom } from "../TextInput.elements";

const TextField = (props) => {
  const {
    field_ref,
    label,
    value,
    parentChangeHandler,
    multi,
    paramType,
  } = props;

  return (
    <TextFieldCustom
      required
      id="outlined-required"
      label={label}
      defaultValue={value}
      variant="outlined"
      onChange={(ev) => parentChangeHandler(ev, field_ref, paramType)}
      multiline={multi}
    />
  );
};

export default TextField;
