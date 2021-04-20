import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Crossword from "@jaredreisinger/react-crossword";

import Loading from "../../UI/Loading";
import Error from "../../UI/Error";

import "./style.css";

const CrossWords = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const gameId = query.get("id");

  const { isLoading, error, data } = useQuery(`getCrossWord_${gameId}`, () =>
    axios(`/api/games/game/${gameId}`)
  );

  if (isLoading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <Container>
      <GameTitle>{data.data.title}</GameTitle>
      <CrossWordWrapper>
        <div style={{ width: "30%" }}>
          <Crossword
            data={data.data.config.crossword_data}
            theme={{
              columnBreakpoint: "9999px",
              gridBackground: "#003399",
              cellBackground: "#ffffff",
              cellBorder: "#fca",
              textColor: "#000000",
              numberColor: "#ffcc00",
              focusBackground: "#acf",
              highlightBackground: "#ddebff",
            }}
          />
        </div>
      </CrossWordWrapper>
      <DirectionInfo>
        <Direction>Horizontal</Direction>
        <Direction>Vertical</Direction>
      </DirectionInfo>
    </Container>
  );
};

export default CrossWords;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const GameTitle = styled.div`
  text-align: center;
  font-size: 1.5rem;
  margin: 2rem;
`;

const CrossWordWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 3rem;
`;

const DirectionInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem;
  width: 80%;
`;

const Direction = styled.h3`
  font-size: 1.5rem;
  padding-right: 4rem;
  padding-left: 2rem;
  margin: -2rem 0;
`;
