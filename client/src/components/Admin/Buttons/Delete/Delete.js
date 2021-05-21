import React from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import styled from "styled-components";

import Button from "@material-ui/core/Button";
import Loading from "../../../UI/Loading";
import Error from "../../../UI/Error";

const Delete = (props) => {
  const { deleteURL, fetchQuery } = props;
  const queryClient = new useQueryClient();
  const mutation = useMutation(() => axios.delete(`${deleteURL}`), {
    onSuccess: () => queryClient.invalidateQueries(fetchQuery),
  });

  let display = "";
  if (mutation.isError) {
    display = <Error error={mutation.error} />;
  } else if (mutation.isLoading) {
    display = <Loading />;
  } else {
    display = (
      <DeleteButton
        variant="contained"
        color="default"
        onClick={mutation.mutate}
      >
        Eliminar
      </DeleteButton>
    );
  }

  return <>{display}</>;
};

export default Delete;

const DeleteButton = styled(Button)`
  && {
    color: #fff;
    font-size: 0.75rem;
    margin: 0.3rem;
    background-color: #880000;

    &:hover {
      background-color: #550000;
    }
  }
`;
