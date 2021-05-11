import React from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import axios from "axios";

import Loading from "../../../UI/Loading";
import Error from "../../../UI/Error";
import BackBtn from "../../Buttons/Back";

import EditForm from "./EditForm";

const Edit = () => {
  const { id } = useParams();
  const fetchDataFlag = id.toString() !== "createNew";
  const fetchQuery = `get${id}Info`;
  const { isLoading, isError, error, data } = useQuery(
    fetchQuery,
    () =>
      axios({
        method: "get",
        url: "/api/polls/work",
        params: {
          id: id,
        },
      }),
    {
      enabled: fetchDataFlag,
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) return <Loading />;
  if (isError) return <Error error={error} />;

  let workObj = null;
  if (!fetchDataFlag) {
    workObj = {
      title: "",
      description: "",
      photo: {
        id: "defaultImage",
        path: "",
        server_path: "",
      },
      poll_id: "",
    };
  } else {
    workObj = { ...data.data };
  }

  return (
    <Container>
      <BackBtn>Voltar</BackBtn>
      {workObj && (
        <EditForm
          fields={workObj}
          createNew={!fetchDataFlag}
          fetchQuery={fetchQuery}
        />
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
