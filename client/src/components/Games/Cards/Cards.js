import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

import GameCard from "../GameCard";
import { CardsSection, CardsWrapper, CardsHeading } from "./Cards.elements";

const Cards = ({ match }) => {
  const [typeOfGames, setTypeOfGames] = useState("none");
  const [gamesInfo, setGamesInfo] = useState([]);

  useEffect(async () => {
    const URL = "/api/games/" + match.params.gameType;
    const result = await axios.get(URL);
    if (!result) return;

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
        obj_temp.img = require("../../../assets/images/games/thumbnails/solution.jpg").default;
      }
      obj_temp.imgAlt = obj.ref;
      obj_temp.cardRef = obj.ref;
      obj_temp.cardsType = match.params.gameType;
      obj_temp.name = result.data.name;
      games.push(obj_temp);
    }

    setGamesInfo(games);
  }, [match.params.gameType]);

  return (
    <CardsSection>
      <CardsHeading>{typeOfGames}</CardsHeading>
      <CardsWrapper>
        {gamesInfo.map((gameInfoObj, index) => (
          <GameCard key={index} gameInfo={gameInfoObj} />
        ))}
      </CardsWrapper>
    </CardsSection>
  );
};

export default Cards;
