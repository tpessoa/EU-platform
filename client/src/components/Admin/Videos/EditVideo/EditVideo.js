import React, { useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import styled from "styled-components";

import Back from "../../Buttons/Back";
import Loading from "../../../UI/Loading";
import Error from "../../../UI/Error";
import EditForm from "./EditForm";

const EditVideo = () => {
  const { videoId } = useParams();
  const fetchDataFlag = videoId.toString() !== "createNew";
  const catQueryStringId = "getAllVideosCategoriesEditVideo";
  const videoQueryStringId = "getVideoInfo";

  const categoriesQuery = useQuery(catQueryStringId, () =>
    axios.get(`/api/videos/categories`)
  );
  const videoInfoQuery = useQuery(
    videoQueryStringId,
    () => axios.get(`/api/videos/video/${videoId}`),
    {
      enabled: fetchDataFlag,
    }
  );

  if (categoriesQuery.isLoading || videoInfoQuery.isLoading) return <Loading />;
  if (categoriesQuery.isError || videoInfoQuery.isError)
    return <Error error={categoriesQuery.error} />;

  let videoObj = {};
  if (fetchDataFlag) {
    const {
      category_id,
      title,
      description,
      url,
      _id,
    } = videoInfoQuery.data.data;
    videoObj = {
      categoryId: category_id,
      title: title,
      description: description,
      url: url,
      id: _id,
    };
  } else {
    videoObj = {
      categoryId: "",
      title: "",
      description: "",
      url: "",
      id: null,
    };
  }

  return (
    <Container>
      <EditWrapper>
        <Back>Voltar</Back>
        <EditForm
          fields={videoObj}
          categories={categoriesQuery.data.data}
          createVideo={!fetchDataFlag}
        />
      </EditWrapper>
      {/* {displayRedirect} */}
    </Container>
  );
};

export default EditVideo;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 60vh;
`;

const EditWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 80%;
  margin: 1rem;
`;

const CategoryWrapper = styled.div`
  width: 40%;
`;
