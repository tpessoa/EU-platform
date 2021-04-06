import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import GameCard from "../GameCard";
import { CardsSection, CardsWrapper, CardsHeading } from "./Cards.elements";

const getCurrentGameObj = (arr, name) => {
  return arr.find((elem) => elem.game_ref_name === name);
};

const Cards = (props) => {
  const { gamesInfo } = props;
  const { game } = useParams();

  const [gamesInfoArr, setGamesInfoArr] = useState([]);

  useEffect(async () => {
    let tempArr = [];
    axios
      .get("/api/games/" + getCurrentGameObj(gamesInfo, game).game_ref_id)
      .then(function (res) {
        res.data.forEach((elem) => {
          tempArr.push(elem);
        });
        setGamesInfoArr(tempArr);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [game]);

  return (
    <CardsSection>
      <CardsHeading>
        {getCurrentGameObj(gamesInfo, game).game_name}
      </CardsHeading>
      <CardsWrapper>
        {gamesInfoArr.map((obj, index) => (
          <GameCard key={index} gameInfo={obj} />
        ))}
      </CardsWrapper>
    </CardsSection>
  );
};

export default Cards;
