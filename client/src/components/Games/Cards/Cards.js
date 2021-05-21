import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import Loading from "../../UI/Loading";
import Error from "../../UI/Error";

import GameCard from "../GameCard";
import { CardsSection, CardsWrapper, CardsHeading } from "./Cards.elements";
import { useGames } from "../../../hooks/useGames";

const getCurrentGameObj = (arr, name) => {
  return arr.find((elem) => elem.game_ref_name === name);
};

const Cards = (props) => {
  const { gamesInfo } = props;
  const { game } = useParams();

  const games = useGames(game);

  if (games.isLoading) return <Loading />;
  if (games.error) return <Error error={games.error} />;

  return (
    <CardsSection>
      {/* <CardsHeading>
        {getCurrentGameObj(gamesInfo, game).game_name}
      </CardsHeading> */}
      <CardsWrapper>
        {games.data.map((obj, index) => (
          <GameCard key={index} gameInfo={obj} />
        ))}
      </CardsWrapper>
    </CardsSection>
  );
};

export default Cards;
