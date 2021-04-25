import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useParams, Redirect } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import BackBtn from "../../Buttons/Back";

import Loading from "../../../UI/Loading";
import Error from "../../../UI/Error";

import EditForm from "./EditForm";

const EditCategory = () => {
  const { catId } = useParams();

  const fetchDataFlag = catId.toString() !== "createNew";
  const fetchQuery = `get${catId}Info`;
  const { isLoading, isError, error, data } = useQuery(
    fetchQuery,
    () => axios(`/api/videos/categories/${catId}`),
    {
      enabled: fetchDataFlag,
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) return <Loading />;
  if (isError) return <Error error={error} />;

  let gameObj = {};
  if (fetchDataFlag) {
    const tempObj = { ...data.data };
    const { _id, title, description, thumbnail } = tempObj;
    gameObj = {
      title: title,
      description: description,
      thumbnail: thumbnail,
      id: _id,
      // tempId isn't needed for updating the respectives images ID after saving bcz a ID already exists
      tempId: null,
    };
  } else {
    gameObj = {
      title: "",
      description: "",
      thumbnail: {
        id: "defaultImage",
        path: "",
        server_path: "",
      },
      category_ref_id: 1,
      category_ref_name: "video",
      id: null,
      // this temporary Id is needed for updating the image (in images schema) with the respective ID after saving the category.
      tempId: "temp_category_image",
    };
  }

  return (
    <Container>
      <EditWrapper>
        <BackBtn>Voltar</BackBtn>
        <EditForm
          fields={gameObj}
          createCategory={!fetchDataFlag}
          fetchQuery={fetchQuery}
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
