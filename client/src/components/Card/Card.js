import React from "react";
import { useHistory } from "react-router-dom";

import {
  CardContainer,
  ImgWrapper,
  Img,
  ContentWrapper,
  Title,
  Description,
} from "./Card.elements";

const Card = ({ title, description, img, imgAlt, cardRef }) => {
  const history = useHistory();
  console.log(history);
  const handleClick = () => {
    history.push("/" + cardRef);
  };

  return (
    <>
      <CardContainer onClick={handleClick}>
        <ImgWrapper>
          <Img src={img} alt={imgAlt} />
        </ImgWrapper>
        <ContentWrapper>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </ContentWrapper>
      </CardContainer>
    </>
  );
};

export default Card;
