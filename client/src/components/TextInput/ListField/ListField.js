import React from "react";

import MenuItem from "@material-ui/core/MenuItem";

import styled from "styled-components";
import { TextFieldCustom } from "../TextInput.elements";

const ListField = (props) => {
  const { arr, field_ref, label, value, parentChangeHandler } = props;
  return (
    <Container>
      <TextFieldCustom
        id="outlined-select-currency"
        variant="outlined"
        select
        label={label}
        // helperText={label}
        value={value}
        onChange={(ev) => parentChangeHandler(ev, field_ref)}
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
