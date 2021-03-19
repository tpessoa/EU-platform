import React from "react";
import { Link as LinkScroll } from "react-scroll";
import { FaPlay } from "react-icons/fa";

import {
  Container,
  Card,
  ImgWrapper,
  Img,
  ContentWrapper,
  ContentTop,
  ContentBottom,
  Icon,
  Title,
  // Description,
} from "./GameCard.elements";

const GameCard = (props) => {
  const { name, title, img, imgAlt, cardsType, cardRef } = props.gameInfo;
  return (
    <>
      <LinkScroll
        to="scrollToFooter"
        smooth={true}
        delay={500}
        duration={1000}
        offset={-80}
      >
        <Container>
          <Card
            to={{
              pathname: `/games/${cardsType}/${name}`,
              search: `?id=${cardRef}`,
            }}
          >
            <ImgWrapper>
              <Img src={img} alt={imgAlt} />
            </ImgWrapper>
            <ContentWrapper>
              <ContentTop>
                <Title>{title}</Title>
              </ContentTop>
              <Icon>
                <FaPlay />
              </Icon>
              {/* <ContentBottom>Info</ContentBottom> */}
            </ContentWrapper>
          </Card>
        </Container>
      </LinkScroll>
    </>
  );
};

export default GameCard;
