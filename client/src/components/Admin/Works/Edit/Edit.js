import React from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import axios from "axios";

import Loading from "../../../UI/Loading";
import Error from "../../../UI/Error";
import BackBtn from "../../Buttons/Back";

import EditForm from "./EditForm";
import { useWork } from "../../../../hooks/usePolls";

const Edit = () => {
  const { id } = useParams();
  const fetchDataFlag = id.toString() !== "createNew";
  const work = useWork(id, fetchDataFlag);

  if (work.isLoading) return <Loading />;
  if (work.isError) return <Error error={work.error} />;

  let workObj = {};
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
    workObj = { ...work.data };
  }

  return (
    <Container>
      <BackBtn>Voltar</BackBtn>
      <EditForm
        fields={workObj}
        createNew={!fetchDataFlag}
        fetchQuery={["work", id]}
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
