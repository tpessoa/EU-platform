import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import styled from "styled-components";

import Button from "@material-ui/core/Button";
import Loading from "../../../UI/Loading";
import Error from "../../../UI/Error";

const Delete = (props) => {
  const { deleteURL, rowId, fetchQuery } = props;
  const queryClient = new useQueryClient();

  const mutation = useMutation(() => axios.delete(`${deleteURL}`), {
    onSuccess: () => queryClient.invalidateQueries(fetchQuery),
  });

  const associatedVideos = useQuery(
    `getAssociatedVideosWithCategory_${rowId}`,
    () => axios(`/api/videos/${rowId}`)
  );
  const deleteVideos = useMutation((videoId) =>
    axios.delete(`/api/videos/video/${videoId}`)
  );

  const associatedImagesToGame = useQuery(
    `getassociatedImagesToGame_${rowId}`,
    () => axios(`/api/upload/images/${rowId}`)
  );
  const deleteImage = useMutation((imageObj) => {
    console.log(imageObj);
    axios.delete(`/api/upload/images/${imageObj._id}`, { data: imageObj });
  });

  const deleteHandler = () => {
    mutation.mutate();

    // search for info associated with this id to delete
    // categories -> videos associated
    associatedVideos.data.data.forEach((video) =>
      deleteVideos.mutate(video._id)
    );

    // games -> images
    associatedImagesToGame.data.data.forEach((imageObj) => {
      deleteImage.mutate(imageObj);
    });
  };

  let display = "";
  if (mutation.isError) {
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
