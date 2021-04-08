import React from "react";
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

  return (
    <Container>
      <TextFieldCustom
        id="outlined-select-currency"
        variant="outlined"
        select
        label={label}
        value={value}
        onChange={(ev) => parentChangeHandler(ev.target.value, field_ref)}
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
