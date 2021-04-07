import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Button from "@material-ui/core/Button";

const Add = (props) => {
  const { url, objId } = props;
  return (
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
};

export default Add;

const AddButton = styled(Button)`
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
