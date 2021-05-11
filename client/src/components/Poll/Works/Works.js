import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useWorksInPoll } from "../../../hooks/usePolls";
import Error from "../../UI/Error";
import Loading from "../../UI/Loading";

import PollCard from "../PollCard";
import Dialog from "../PollCard/Dialog";
import DialogForm from "../DialogForm";

const Works = () => {
  const { id } = useParams();
  const works = useWorksInPoll(id);
  const [openDialog, setOpenDialog] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [selected, setSelected] = useState(-1);

  if (works.isLoading) {
    return <Loading />;
  }
  if (works.isError) {
    return <Error error={works.error} />;
  }

  // console.log(works.data);
  console.log(openDialog);

  return (
    <Container>
      {!works.data.length ? (
        <h1>Categoria ainda sem trabalhos</h1>
      ) : (
        <GalleryWrapper>
          {works.data.map((work, index) => (
            <PollCard
              key={index}
              index={index}
              work={work}
              setImageOpen={setOpenDialog}
              setFormOpen={setOpenForm}
              setSelected={setSelected}
            />
          ))}
        </GalleryWrapper>
      )}
      {openDialog && (
        <Dialog obj={works.data[selected]} setOpenDialog={setOpenDialog} />
      )}
      {openForm && (
        <DialogForm obj={works.data[selected]} setOpenForm={setOpenForm} />
      )}
    </Container>
  );
};

export default Works;

const Container = styled.div`
  min-height: 80vh;
  padding: 40px;
  /* background-color: #1e3c72; */
  @media screen and (max-width: 600px) {
    padding: 20px;
  }
`;

const GalleryWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, max-content));
  justify-content: center;
  align-items: center;
`;
