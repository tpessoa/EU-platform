import React from "react";

import {
  CardContainer,
  ImgWrapper,
  Img,
  ContentWrapper,
  Title,
  // Description,
} from "./Card.elements";

const Card = (props) => {
  const { name, title, img, imgAlt, cardsType, cardRef } = props.gameInfo;
  return (
    <>
      <CardContainer
        to={{
          pathname: `/games/${cardsType}/${name}`,
          search: `?id=${cardRef}`,
        }}
      >
        <ImgWrapper>
          <Img src={img} alt={imgAlt} />
        </ImgWrapper>
        <ContentWrapper>
          <Title>{title}</Title>
          {/* <Description>{description}</Description> */}
        </ContentWrapper>
      </CardContainer>
    </>
  );
};

export default Card;
