import React from "react";
import styled from "styled-components";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

import Loading from "../../UI/Loading";
import Error from "../../UI/Error";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const OldImage = (props) => {
  const { imageId, imageURL, fetchQuery } = props;
  const queryClient = new useQueryClient();

  const imageNameSplitted = imageURL.split("/");
  imageNameSplitted.shift();
  imageNameSplitted.shift();

  const imageNameWithoutDate = imageNameSplitted.join("");
  const imageNameWithoutDateSplitted = imageNameWithoutDate.split("Z");

  const imageData = imageNameWithoutDateSplitted.shift();
  const imageName = imageNameWithoutDateSplitted.pop();

  const deleteURL = `/api/upload/images/${imageId}`;

  const mutation = useMutation(
    () => axios.delete(`${deleteURL}`, { data: { imgServerPath: imageURL } }),
    {
      onSuccess: () => queryClient.invalidateQueries(fetchQuery),
    }
  );

  const deleteHandler = () => {
    mutation.mutate();
  };

  return (
    <Container>
      <ImageNameWrapper>{imageName}</ImageNameWrapper>
      <RemoveWrapper>
        <IconButton aria-label="delete" onClick={deleteHandler}>
          <DeleteIcon />
        </IconButton>
      </RemoveWrapper>
    </Container>
  );
};

export default OldImage;

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  margin: 1rem 0;
`;

const ImageNameWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 85%;
  margin-left: 1rem;
  min-width: 10rem;
`;

const RemoveWrapper = styled.div`
  position: absolute;
  right: 0rem;
`;
