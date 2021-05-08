import React from "react";
import { useQuery } from "react-query";
import { useParams, Redirect } from "react-router-dom";

import axios from "axios";
import styled from "styled-components";

import Loading from "../../../UI/Loading";
import Error from "../../../UI/Error";
import BackBtn from "../../Buttons/Back";
import Form from "./Form";

const Edit = () => {
  const { pollId } = useParams();
  const fetchDataFlag = pollId.toString() !== "createNew";
  const fetchQuery = `get${pollId}Info`;
  const { isLoading, isError, error, data } = useQuery(
    fetchQuery,
    () =>
      axios({
        method: "get",
        url: `/api/polls/poll`,
        params: {
          pollId: pollId,
        },
      }),
    {
      enabled: fetchDataFlag,
      refetchOnWindowFocus: false,
    }
  );

  let gameObj = {};
  if (fetchDataFlag) {
    const tempObj = { ...data.data };
    const { _id, title, description, thumbnail } = tempObj;
    gameObj = {
      title: title,
      description: description,
      thumbnail: thumbnail,
      id: _id,
      // tempId isn't needed for updating the respectives images ID after saving bc a ID already exists
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

  if (isLoading) return <Loading />;
  if (isError) return <Error error={error} />;

  return (
    <Container>
      <BackBtn>Voltar</BackBtn>
      <Form
        fields={gameObj}
        createPoll={!fetchDataFlag}
        fetchQuery={fetchQuery}
      />
    </Container>
  );
};

export default Edit;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
