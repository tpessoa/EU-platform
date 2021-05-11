import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useParams, Redirect } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import { useCategory } from "../../../../hooks/useVideos";

import BackBtn from "../../Buttons/Back";

import Loading from "../../../UI/Loading";
import Error from "../../../UI/Error";

import EditForm from "./EditForm";

const EditCategory = () => {
  const { id } = useParams();

  const fetchDataFlag = id.toString() !== "createNew";
  const category = useCategory(id, fetchDataFlag);

  if (category.isLoading) return <Loading />;
  if (category.isError) return <Error error={category.error} />;

  let videoObj = {};
  if (fetchDataFlag) {
    videoObj = { ...category.data };
  } else {
    videoObj = {
      title: "",
      description: "",
      thumbnail: {
        id: "defaultImage",
        path: "",
        server_path: "",
      },
    };
  }

  return (
    <Container>
      <EditWrapper>
        <BackBtn>Voltar</BackBtn>
        <EditForm
          fields={videoObj}
          createNew={!fetchDataFlag}
          fetchQuery={"video-category"}
        />
      </EditWrapper>
    </Container>
  );
};

export default EditCategory;

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
