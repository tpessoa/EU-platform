import React from "react";
import styled from "styled-components";
import { usePolls } from "../../../hooks/usePolls";
import Error from "../../UI/Error";
import Loading from "../../UI/Loading";
import PollCard from "../PollCard";

import Card from "./PollCategoryCard";

const PollGallery = ({ pollList }) => {
  const polls = usePolls();
  if (polls.isLoading) {
    return <Loading />;
  }
  if (polls.isError) {
    return <Error error={polls.error} />;
  }

  console.log(polls.data);
  return (
    <Container>
      <TextWrapper>Categorias</TextWrapper>
      <GalleryWrapper>
        {polls.data.map((poll, index) => (
          <Card key={index} num={index} info={poll} />
        ))}
      </GalleryWrapper>
    </Container>
  );
};

export default PollGallery;

const Container = styled.div`
  min-height: 80vh;
  padding: 40px;
  /* background-color: #1e3c72; */
  @media screen and (max-width: 600px) {
    padding: 20px;
  }
`;

const TextWrapper = styled.h1`
  text-align: center;
  margin-bottom: 1rem;
`;

const GalleryWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, max-content));
  justify-content: center;
  align-items: center;
`;

const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5vh;
`;
