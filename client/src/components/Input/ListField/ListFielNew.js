import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import MenuItem from "@material-ui/core/MenuItem";

import styled from "styled-components";
import { TextFieldCustom } from "../Input.elements";

const ListField = (props) => {
  const {
    arr,
    field_ref,
    label,
    value,
    parentChangeHandler,
    objElem,
    redirectURL,
  } = props;

  const [selected, setSelected] = useState("");

  useEffect(() => {
    setSelected(value);
  }, []);

  let displayItems = "";
  if (redirectURL) {
    displayItems = arr.map((item, index) => (
      <MenuItem
        key={index}
        value={index}
        component={Link}
        to={{
          pathname: redirectURL,
          search: `?id=${item._id}`,
        }}
      >
        {item[objElem]}
      </MenuItem>
    ));
  } else {
    displayItems = arr.map((item, index) => (
      <MenuItem key={index} value={index}>
        {item[objElem]}
      </MenuItem>
    ));
  }

  const changeHandler = (userInput, field_ref) => {
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
        onChange={(ev) => changeHandler(ev.target.value, field_ref)}
      >
        {displayItems}
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
