import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { TextFieldCustom } from "../Input.elements";

import MenuItem from "@material-ui/core/MenuItem";

const ListField = (props) => {
  const { arr, field_ref, label, value, parentChangeHandler } = props;

  const [selected, setSelected] = useState("");

  useEffect(() => {
    setSelected(value);
  }, []);

  const changeHandler = (ev, field_ref) => {
    const userInput = ev.target.value;
    setSelected(userInput);
    parentChangeHandler(userInput, field_ref);
  };

  return (
    <Container>
      <TextFieldCustom
        id="outlined-select-currency"
        variant="outlined"
        select
        label={label}
        value={selected}
        onChange={(ev) => changeHandler(ev, field_ref)}
      >
        {arr.map((item, index) => (
          <MenuItem key={index} value={index}>
            {item}
          </MenuItem>
        ))}
      </TextFieldCustom>
    </Container>
  );
};

export default ListField;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
