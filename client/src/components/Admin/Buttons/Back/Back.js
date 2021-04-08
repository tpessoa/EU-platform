import React from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

import Button from "@material-ui/core/Button";

const Back = (props) => {
  const { url } = props;
  const history = useHistory();

  let display = "";
  if (url) {
    display = (
      <BackButton variant="contained" color="primary" component={Link} to={url}>
        {props.children}
      </BackButton>
    );
  } else {
    display = (
      <BackButton variant="contained" color="primary" onClick={history.goBack}>
        {props.children}
      </BackButton>
    );
  }
  return <>{display}</>;
};

export default Back;

const BackButton = styled(Button)`
  && {
    font-size: 0.75rem;
    margin: 1rem;
    background-color: #e2cc00;

    &:hover {
      background-color: #bba800;
    }
  }
`;
