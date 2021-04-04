import React from "react";

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

  let formattedValue = value;
  if (range_min && range_max) {
    if (parseInt(value) <= range_min) {
      formattedValue = range_min;
    } else if (parseInt(value) >= range_max) {
      formattedValue = range_max;
    } else {
      formattedValue = value;
    }
  }

  return (
    <Container>
      <TextFieldCustom
        id="outlined-number"
        type="number"
        label={label}
        value={formattedValue}
        onChange={(ev) => parentChangeHandler(ev, field_ref)}
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
