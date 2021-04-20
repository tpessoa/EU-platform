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

  const { isLoading, error, data } = useQuery(
    `getInteractiveMap_${gameId}`,
    () =>
      axios(`/api/games/game/${gameId}`, {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
      })
  );

  if (isLoading) return <Loading />;
  if (error) return <Error error={error} />;

  const CW_data = {
    across: {
      1: {
        clue: "one plus one",
        answer: "TWO",
        row: 0,
        col: 0,
      },
    },
    down: {
      2: {
        clue: "three minus two",
        answer: "ONE",
        row: 0,
        col: 2,
      },
    },
  };

  const clue = "";

  const CW2_data = {
    across: {
      1: {
        clue: "Thsdsdfssis df",
        answer: "XXX",
        row: 0,
        col: 0,
      },
      4: { clue: "is", answer: "XXX", row: 0, col: 4 },
      7: { clue: "not", answer: "XXX", row: 1, col: 0 },
      8: { clue: "a", answer: "XXXX", row: 1, col: 4 },
      10: { clue: "real", answer: "XX", row: 2, col: 0 },
      11: { clue: "crossword,", answer: "XX", row: 2, col: 3 },
      12: { clue: "it", answer: "XX", row: 2, col: 6 },
      13: { clue: "is", answer: "XXXXXX", row: 3, col: 0 },
      16: { clue: "only", answer: "XXXXXX", row: 4, col: 2 },
      19: { clue: "showing", answer: "XX", row: 5, col: 0 },
      21: { clue: "the", answer: "XX", row: 5, col: 3 },
      22: { clue: "kind", answer: "XX", row: 5, col: 6 },
      23: { clue: "of", answer: "XXXX", row: 6, col: 0 },
      25: { clue: "thing", answer: "XXX", row: 6, col: 5 },
      26: { clue: "you", answer: "XXX", row: 7, col: 1 },
      27: { clue: "can", answer: "XXX", row: 7, col: 5 },
    },
    down: {
      1: { clue: "create.", answer: "XXXX", row: 0, col: 0 },
      2: { clue: "All", answer: "XXXX", row: 0, col: 1 },
      3: { clue: "of", answer: "XX", row: 0, col: 2 },
      4: { clue: "the", answer: "XXXXXX", row: 0, col: 4 },
      5: { clue: "answers", answer: "XX", row: 0, col: 5 },
      6: { clue: "are", answer: "XXX", row: 0, col: 6 },
      9: { clue: '"X"', answer: "XX", row: 1, col: 7 },
      11: { clue, answer: "XXXXXX", row: 2, col: 3 },
      14: { clue, answer: "XX", row: 3, col: 2 },
      15: { clue, answer: "XX", row: 3, col: 5 },
      17: { clue, answer: "XXXX", row: 4, col: 6 },
      18: { clue, answer: "XXXX", row: 4, col: 7 },
      19: { clue, answer: "XX", row: 5, col: 0 },
      20: { clue, answer: "XXX", row: 5, col: 1 },
      24: { clue, answer: "XX", row: 6, col: 2 },
      25: { clue, answer: "XX", row: 6, col: 5 },
    },
  };
  const gameTitle = "ola";
  return (
    <Container>
      <GameTitle>{gameTitle}</GameTitle>
      <CrossWordWrapper>
        <div style={{ width: "30%" }}>
          <Crossword
            data={CW2_data}
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
