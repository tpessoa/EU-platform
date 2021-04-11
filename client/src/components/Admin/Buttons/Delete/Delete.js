import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import styled from "styled-components";

import Button from "@material-ui/core/Button";
import Loading from "../../../UI/Loading";
import Error from "../../../UI/Error";

const Delete = (props) => {
  const { deleteObjId, deleteURL, fetchQuery } = props;
  const queryClient = new useQueryClient();

  const mutation = useMutation(
    (objId) => axios.delete(`${deleteURL}/${objId}2`),
    {
      onSuccess: () => queryClient.invalidateQueries(fetchQuery),
    }
  );

  const deleteHandler = () => {
    mutation.mutate(deleteObjId);
  };

  let display = "";
  if (mutation.isSuccess) {
    display = <p>sucesso</p>;
  } else if (mutation.isError) {
    display = <Error error={mutation.error} />;
  } else if (mutation.isLoading) {
    display = <Loading />;
  } else {
    display = (
      <DeleteButton variant="contained" color="primary" onClick={deleteHandler}>
        {props.children}
      </DeleteButton>
    );
  }

  return <Container>{display}</Container>;
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

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 7rem;
  max-width: 10rem;
`;
