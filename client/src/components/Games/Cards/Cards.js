import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import Loading from "../../UI/Loading";
import Error from "../../UI/Error";

import GameCard from "../GameCard";
import { CardsSection, CardsWrapper, CardsHeading } from "./Cards.elements";

const getCurrentGameObj = (arr, name) => {
  return arr.find((elem) => elem.game_ref_name === name);
};

const Cards = (props) => {
  const { gamesInfo } = props;
  const { game } = useParams();

  const { isLoading, error, data } = useQuery("getGamesOfCurrentType", () =>
    axios(`/api/games/${getCurrentGameObj(gamesInfo, game).game_ref_id}`)
  );

  if (isLoading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <CardsSection>
      <CardsHeading>
        {getCurrentGameObj(gamesInfo, game).game_name}
      </CardsHeading>
      <CardsWrapper>
        {data.data.map((obj, index) => (
          <GameCard key={index} gameInfo={obj} />
        ))}
      </CardsWrapper>
    </CardsSection>
  );
};

export default Cards;
