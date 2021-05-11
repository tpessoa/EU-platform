import React, { useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import { useVideo } from "../../../../hooks/useVideos";
import styled from "styled-components";
import Error from "../../../UI/Error";
import Loading from "../../../UI/Loading";
import BackBtn from "../../Buttons/Back";
import EditForm from "./EditForm";

const EditVideo = () => {
  const { id } = useParams();
  const fetchDataFlag = id.toString() !== "createNew";
  const video = useVideo(id, fetchDataFlag);

  let videoObj = null;
  if (!fetchDataFlag) {
    videoObj = {
      category_id: "",
      title: "",
      description: "",
      url: "",
    };
  } else {
    videoObj = { ...video.data };
  }

  if (video.isLoading) return <Loading />;
  if (video.isError) return <Error error={video.error} />;

  return (
    <Container>
      <BackBtn>Voltar</BackBtn>
      {videoObj && (
        <EditForm
          fields={videoObj}
          createNew={!fetchDataFlag}
          fetchQuery={["video", id]}
        />
      )}
    </Container>
  );
};

export default EditVideo;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  min-height: 60vh;
`;
