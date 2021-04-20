import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { TextFieldCustom } from "../Input.elements";

const NumberField = (props) => {
  const {
    disabled,
    field_ref,
    label,
    value,
    parentChangeHandler,
    range_min,
    range_max,
  } = props;

  const [number, setNumber] = useState("");

  useEffect(() => {
    if (value === null) return;
    let tempValue = value;
    if (range_min && range_max) {
      if (parseInt(value) <= range_min) {
        tempValue = range_min;
      } else if (parseInt(value) >= range_max) {
        tempValue = range_max;
      } else {
        tempValue = value;
      }
    }
    setNumber(tempValue);
  }, []);

  const changeHandler = (ev, field_ref) => {
    const userInput = ev.target.value;
    setNumber(userInput);
    parentChangeHandler(userInput, field_ref);
  };
  return (
    <Container>
      <TextFieldCustom
        id="outlined-number"
        type="number"
        label={label}
        value={number}
        onChange={(ev) => changeHandler(ev, field_ref)}
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        disabled={disabled}
      ></TextFieldCustom>
    </Container>
  );
};

export default NumberField;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
