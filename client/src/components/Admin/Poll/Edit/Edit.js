import React from "react";
import { useQuery } from "react-query";
import { useParams, Redirect } from "react-router-dom";

import axios from "axios";
import styled from "styled-components";

import Loading from "../../../UI/Loading";
import Error from "../../../UI/Error";
import BackBtn from "../../Buttons/Back";
import AddNewForm from "./AddNewForm";
import EditForm from "./EditForm";

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
    };
  }

  return (
    <Container>
      <BackBtn>Voltar</BackBtn>
      {fetchDataFlag ? (
        <EditForm fields={gameObj} fetchQuery={fetchQuery} />
      ) : (
        <AddNewForm fields={gameObj} fetchQuery={fetchQuery} />
      )}
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
