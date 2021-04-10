import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Button from "@material-ui/core/Button";

const Add = (props) => {
  const { url, objId, search } = props;

  let displayBtn = "";
  if (search) {
    displayBtn = (
      <AddButton
        variant="contained"
        color="primary"
        component={Link}
        to={{
          pathname: url,
          search: `?id=${objId}`,
        }}
      >
        {props.children}
      </AddButton>
    );
  } else {
    displayBtn = (
      <AddButton
        variant="contained"
        color="primary"
        component={Link}
        to={`${url}/${objId}`}
      >
        {props.children}
      </AddButton>
    );
  }

  return <>{displayBtn}</>;
};

export default Add;

const AddButton = styled(Button)`
  && {
    font-size: 0.75rem;
    background-color: #00a531;
    margin: 2rem;

    &:hover {
      background-color: #045222;
    }
  }
`;
