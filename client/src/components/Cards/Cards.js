import React from "react";
import Card from "../Card/Card";

import { CardsSection, CardsWrapper, CardsHeading } from "./Cards.elements";

const gameObjOne = {
  title: "Puzzle",
  description: "Encaixa as peças de modo a formares a imagem!",
  img: require("../../images/puzzle_test_1.jpg").default,
  imgAlt: "test puzzle image",
  cardRef: "a1231231231sadsd",
};

const gameObjTwo = {
  title: "Puzzle",
  description:
    "Encaixa as peças de modo a formarEncaixa as peças de modo a formarEncaixa as peças de modo a formarEncaixa as peças de modo a formarEncaixa as peças de modo a formares a imagem!",
  img: require("../../images/puzzle_test_1.jpg").default,
  imgAlt: "test puzzle image",
};

const Cards = ({ match }) => {
  console.log(match.params.gameType);
  return (
    <CardsSection>
      <CardsHeading>Jogos de Puzzle</CardsHeading>
      <CardsWrapper>
        <Card {...gameObjOne} />
        <Card {...gameObjOne} />
        <Card {...gameObjOne} />
        <Card {...gameObjOne} />
        <Card {...gameObjOne} />
        <Card {...gameObjOne} />
      </CardsWrapper>
    </CardsSection>
  );
};

export default Cards;
