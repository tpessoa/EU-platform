import React from "react";
import styled from "styled-components";

import Button from "@material-ui/core/Button";

const Delete = (props) => {
  const { deleteHandler } = props;
  return (
    <DeleteButton variant="contained" color="primary" onClick={deleteHandler}>
      {props.children}
    </DeleteButton>
  );
};

export default Delete;

const DeleteButton = styled(Button)`
  && {
    font-size: 0.75rem;
    margin: 0.3rem;
    background-color: #880000;

    &:hover {
      background-color: #550000;
    }
  }
`;
