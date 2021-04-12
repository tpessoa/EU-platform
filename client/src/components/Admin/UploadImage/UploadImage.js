import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import Loading from "../../UI/Loading";
import Error from "../../UI/Error";

const Upload = (props) => {
  const { linkedObj, inputRef, fetchQuery, setImage } = props;
  const queryClient = new useQueryClient();

  const [file, setFile] = useState(null);

  const URL_str = `/api/upload/gameImage/${linkedObj}/${inputRef}`;
  const config = {
    headers: { "content-Type": "multipart/form-data" },
  };
  const mutation = useMutation(
    (req_data) => axios.post(URL_str, req_data, config),
    {
      onSettled: () => queryClient.invalidateQueries(fetchQuery),
      onSuccess: (data) => setImage(data.data.img),
    }
  );

  const onChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();

    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      mutation.mutate(formData);
    }
  };

  let displayUpload = "";
  if (mutation.isLoading) {
    displayUpload = <Loading />;
  } else if (mutation.isError) {
    displayUpload = <Error error={mutation.error} />;
  } else {
    displayUpload = (
      <Button variant="contained" color="primary" type="submit">
        Upload Imagem
      </Button>
    );
  }

  return (
    <form onSubmit={onFormSubmit}>
      <Input type="file" name="image" onChange={onChange} />
      <ButtonWrapper>{displayUpload}</ButtonWrapper>
    </form>
  );
};

export default Upload;

const Input = styled.input`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
  font-size: 1rem;
  margin: 0.5rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 1rem;
  margin: 0.5rem;
`;
