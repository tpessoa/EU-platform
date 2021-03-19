import React from "react";
import { FaStar } from "react-icons/fa";

import {
  Container,
  CardWrapper,
  Card,
  CardTopInfo,
  CardBottomInfo,
  Title,
  Author,
  Votes,
  VoteIcon,
  VoteBtn,
} from "./PollCard.elements";

const PollCard = ({ card }) => {
  const voteBtnHandler = () => {
    console.log("voting");
  };

  return (
    <Container>
      <CardWrapper>
        <Card src={card.img} />
        <CardTopInfo>
          <Title>{card.title}</Title>
          <VoteBtn onClick={voteBtnHandler}>Votar</VoteBtn>
        </CardTopInfo>
        <CardBottomInfo>
          <Author>{card.author}</Author>
          <Votes>
            <p>{card.votes}</p>
            <VoteIcon>
              <FaStar />
            </VoteIcon>
          </Votes>
        </CardBottomInfo>
      </CardWrapper>
    </Container>
  );
};

export default PollCard;
