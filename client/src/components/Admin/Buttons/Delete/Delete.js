import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import styled from "styled-components";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Loading from "../../../UI/Loading";
import Error from "../../../UI/Error";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const Delete = (props) => {
  const classes = useStyles();
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
      <Button
        className={classes.button}
        variant="contained"
        color="default"
        onClick={mutation.mutate}
      >
        Eliminar
      </Button>
    );
  }

  return <>{display}</>;
};

export default Delete;

const DeleteButton = styled(Button)`
  && {
    background-color: #880000;

    &:hover {
      background-color: #550000;
    }
  }
`;
