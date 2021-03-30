import React from "react";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";

import styled from "styled-components";

const ListField = (props) => {
  const {
    arr,
    field_ref,
    label,
    value,
    parentChangeHandler,
    paramType,
  } = props;
  return (
    <Container>
      <TextFieldCustom
        id="outlined-select-currency"
        variant="outlined"
        select
        label={label}
        // helperText={label}
        value={value}
        onChange={(ev) => parentChangeHandler(ev, field_ref, paramType)}
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

const TextFieldCustom = styled(TextField)`
  width: 100%;
`;
