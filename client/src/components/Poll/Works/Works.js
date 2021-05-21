import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { usePoll, useWorksInPoll } from "../../../hooks/usePolls";
import Error from "../../UI/Error";
import Loading from "../../UI/Loading";

import PollCard from "../PollCard";
import Dialog from "../PollCard/Dialog";
import DialogForm from "../DialogForm";
import BackBtn from "../../../components/Admin/Buttons/Back";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backBtn: {
    display: "grid",
    placeItems: "center",
  },
  winnerWork: {
    display: "grid",
    placeItems: "center",
  },
  works: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(-4),
  },
}));

const Works = () => {
  const classes = useStyles();
  const { id } = useParams();
  const works = useWorksInPoll(id);
  const poll = usePoll(id);
  const [openDialog, setOpenDialog] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [selected, setSelected] = useState(-1);

  if (works.isLoading || poll.isLoading) {
    return <Loading />;
  }
  if (works.isError || poll.isLoading) {
    return <Error error={works.error} />;
  }

  // console.log(works.data);

  const getWinnerWork = () => {
    let MIN = 0;
    let index = 0;
    for (let i = 0; i < works.data.length; i++) {
      const votes_size = works.data[i].votes.length;
      if (votes_size > MIN) {
        MIN = votes_size;
        index = i;
      }
    }

    return index;
  };

  let displayWinner = "";
  if (poll.data.ended) {
    const winnerIndex = getWinnerWork();

    displayWinner = (
      <div className={classes.winnerWork}>
        <Typography variant="h3" gutterBottom align="center">
          Votação terminada
        </Typography>
        <Typography gutterBottom variant="h5" gutterBottom align="center">
          O vencedor é
        </Typography>
        <PollCard
          index={winnerIndex}
          work={works.data[winnerIndex]}
          setImageOpen={setOpenDialog}
          setFormOpen={setOpenForm}
          setSelected={setSelected}
        />
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          className={classes.works}
        >
          Todos os trabalhos
        </Typography>
      </div>
    );
  }

  return (
    <>
      <div className={classes.backBtn}>
        <BackBtn>Voltar</BackBtn>
      </div>
      {displayWinner}
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
                enableVote={!poll.data.ended}
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
    </>
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
