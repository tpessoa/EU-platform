import React from "react";
import { FaStar } from "react-icons/fa";

import {
  Container,
  CardWrapper,
  Card,
  CardTopInfo,
  CardBottomInfo,
  Author,
  Votes,
  VoteIcon,
} from "./PollCard.elements";

const PollCard = ({ card }) => {
  return (
    <Container>
      <CardWrapper>
        <Card src={card.img} />
        <CardTopInfo>{card.title}</CardTopInfo>
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
