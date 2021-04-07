import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Button from "@material-ui/core/Button";

const Edit = (props) => {
  const { url, objId, redirect } = props;

  let display = "";
  if (redirect) {
    display = (
      <EditButton
        variant="contained"
        color="primary"
        component={Link}
        to={{
          pathname: url,
          search: `?id=${objId}`,
        }}
      >
        {props.children}
      </EditButton>
    );
  } else {
    display = (
      <EditButton variant="contained" color="primary">
        {props.children}
      </EditButton>
    );
  }
  return <>{display}</>;
};

export default Edit;

const EditButton = styled(Button)`
  && {
    font-size: 0.75rem;
    margin: 0.3rem;
  }
`;
