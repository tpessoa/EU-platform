import React from "react";

import styled from "styled-components";

import Button from "@material-ui/core/Button";

const Save = (props) => {
  const { clickHandler, saved } = props;
  return (
    <SaveButton
      variant="contained"
      color="primary"
      onClick={clickHandler}
      disabled={saved}
    >
      {props.children}
    </SaveButton>
  );
};

export default Save;

const SaveButton = styled(Button)`
  && {
    font-size: 0.75rem;
    margin: 0.3rem;
    background-color: #00a531;
    margin: 2rem;

    &:hover {
      background-color: #045222;
    }
  }
`;
