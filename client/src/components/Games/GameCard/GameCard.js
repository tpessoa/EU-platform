import React from "react";
import { Link as LinkScroll } from "react-scroll";
import { FaPlay } from "react-icons/fa";

import DefaultImage from "../../../assets/images/defaultImage.jpg";

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
  const { gameInfo } = props;

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
              pathname: `/games/${gameInfo.game_ref_name}/game`,
              search: `?id=${gameInfo._id}`,
            }}
          >
            <ImgWrapper>
              {gameInfo.thumbnail.id === "defaultImage" ? (
                <Img src={DefaultImage} alt={gameInfo.thumbnail.id} />
              ) : (
                <Img
                  src={gameInfo.thumbnail.path + gameInfo.thumbnail.server_path}
                  alt={gameInfo.thumbnail.id}
                />
              )}
            </ImgWrapper>
            <ContentWrapper>
              <ContentTop>
                <Title>{gameInfo.title}</Title>
              </ContentTop>
              <Icon>
                <FaPlay />
              </Icon>
            </ContentWrapper>
          </Card>
        </Container>
      </LinkScroll>
    </>
  );
};

export default GameCard;
