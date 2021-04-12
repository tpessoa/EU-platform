import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useParams, Redirect } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import TextInput from "../../../Input/TextField/TextFieldNew";
import ImageField from "../../ImageField";
import Save from "../../Buttons/Save";
import BackBtn from "../../Buttons/Back";

import Loading from "../../../UI/Loading";
import Error from "../../../UI/Error";

import EditForm from "./EditForm";

const EditCategory = () => {
  const { catId } = useParams();

  const fetchDataFlag = catId.toString() !== "createNew";
  const { isLoading, isError, error, data } = useQuery(
    `get${catId}Info"`,
    () => axios(`/api/videos/categories/${catId}`),
    {
      enabled: fetchDataFlag,
    }
  );

  if (isLoading) return <Loading />;
  if (isError) return <Error error={error} />;

  let gameObj = {};
  if (fetchDataFlag) {
    const tempObj = { ...data.data };
    const { title, description, thumbnail, _id } = tempObj;

    gameObj = {
      title: title,
      description: description,
      thumbnail: thumbnail,
      id: _id,
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
      id: null,
    };
  }

  return (
    <Container>
      <EditWrapper>
        <BackBtn>Voltar</BackBtn>
        <EditForm fields={gameObj} createCategory={!fetchDataFlag} />
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
`;

const EditWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 80%;
  margin: 1rem;
`;
