import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

import Card from "../Card";
import { CardsSection, CardsWrapper, CardsHeading } from "./Cards.elements";

const gameObjOne = {
  title: "Puzzle",
  description: "Encaixa as peças de modo a formares a imagem!",
  img: require("../../images/puzzle_test_1.jpg").default,
  imgAlt: "test puzzle image",
  cardRef: "a1231231231sadsd",
};

const Cards = ({ match }) => {
  const [typeOfGames, setTypeOfGames] = useState("none");
  const [gamesInfo, setGamesInfo] = useState([]);

  useEffect(async () => {
    const URL = "/api/games/" + match.params.gameType;
    const result = await axios.get(URL);
    if (!result) return;

    const gameObjTwo = {
      title: "Puzzle",
      description: "Encaixa as peças de modo a formares a imagem!",
      img: require("../../images/puzzle_test_1.jpg").default,
      imgAlt: "test puzzle image",
    };

    setTypeOfGames(result.data.title);
    let games = [];
    for (let i in result.data.games) {
      let obj = result.data.games[i];
      let obj_temp = {};

      obj_temp.title = obj.title;
      obj_temp.description = "Encaixa as peças de modo a formares a imagem!";
      if (obj.src) {
        obj_temp.img = obj.src;
      } else {
        obj_temp.img = require("../../images/puzzle_test_1.jpg").default;
      }
      obj_temp.imgAlt = obj.ref;
      obj_temp.cardRef = obj.ref;
      obj_temp.cardsType = match.params.gameType;
      obj_temp.name = result.data.name;
      games.push(obj_temp);
    }

    console.log(games);
    setGamesInfo(games);
  }, [match.params.gameType]);

  return (
    <CardsSection>
      <CardsHeading>{typeOfGames}</CardsHeading>
      <CardsWrapper>
        {gamesInfo.map((gameInfoObj, index) => (
          <Card key={index} gameInfo={gameInfoObj} />
        ))}
      </CardsWrapper>
    </CardsSection>
  );
};

export default Cards;
