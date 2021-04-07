import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import Button from "@material-ui/core/Button";

const Back = (props) => {
  const history = useHistory();
  return (
    <BackButton variant="contained" color="primary" onClick={history.goBack}>
      {props.children}
    </BackButton>
  );
};

export default Back;

const BackButton = styled(Button)`
  && {
    font-size: 0.75rem;
    margin: 0.3rem;
    background-color: #e2cc00;

    &:hover {
      background-color: #bba800;
    }
  }
`;
