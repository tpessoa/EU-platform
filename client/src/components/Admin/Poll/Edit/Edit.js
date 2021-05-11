import React from "react";
import { useParams } from "react-router-dom";

import styled from "styled-components";

import Loading from "../../../UI/Loading";
import Error from "../../../UI/Error";
import BackBtn from "../../Buttons/Back";
import EditForm from "./EditForm";
import { usePoll } from "../../../../hooks/usePolls";

const Edit = () => {
  const { id } = useParams();
  const fetchDataFlag = id.toString() !== "createNew";
  const poll = usePoll(id, fetchDataFlag);

  if (poll.isLoading) return <Loading />;
  if (poll.isError) return <Error error={poll.error} />;

  let gameObj = {};
  if (fetchDataFlag) {
    gameObj = { ...poll.data };
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
      <EditForm
        fields={gameObj}
        fetchQuery={["poll", id]}
        createNew={!fetchDataFlag}
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
