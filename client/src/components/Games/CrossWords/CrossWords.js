import React, { useState, useRef, useCallback } from "react";
import { useQuery } from "react-query";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Crossword from "@jaredreisinger/react-crossword";

import Loading from "../../UI/Loading";
import Error from "../../UI/Error";
import Button from "../../Input/Button";

import "./style.css";

const CrossWords = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const gameId = query.get("id");

  const { isLoading, error, data } = useQuery(`getCrossWord_${gameId}`, () =>
    axios(`/api/games/game/${gameId}`)
  );

  const crossword = useRef();
  const [wordCorrect, setWordCorrect] = useState(false);

  const fillAllAnswers = useCallback((event) => {
    crossword.current.fillAllAnswers();
  }, []);

  const reset = useCallback((event) => {
    crossword.current.reset();
  }, []);

  // onCorrect is called with the direction, number, and the correct answer.
  const onCorrect = useCallback((direction, number, answer) => {
    console.log("correto");
    setWordCorrect(true);
  }, []);

  // onCellChange is called with the row, column, and character.
  const onCellChange = useCallback((row, col, char) => {
    setWordCorrect(false);
  }, []);

  // // onCrosswordCorrect is called with a truthy/falsy value.
  // const onCrosswordCorrect = useCallback(
  //   (isCorrect) => {
  //     addMessage(`onCrosswordCorrect: ${JSON.stringify(isCorrect)}`);
  //   },
  //   [addMessage]
  // );

  if (isLoading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <Container>
      <GameTitle>{data.data.title}</GameTitle>
      <Commands>
        <Button
          btnText={"Preencher todas as palavras"}
          clickHandler={fillAllAnswers}
          filled={true}
        />
        <Button
          btnText={"Começar de novo"}
          clickHandler={reset}
          filled={true}
        />
      </Commands>

      {wordCorrect && <CorrectWrapper>Acertaste!</CorrectWrapper>}

      <CrossWordWrapper>
        {/* <div style={{ width: "30%" }}> */}
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
          useStorage={false}
          ref={crossword}
          onCellChange={onCellChange}
          onCorrect={onCorrect}
          // onCrosswordCorrect={onCrosswordCorrect}
        />
        {/* </div> */}
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
  margin: 3rem;
`;

const CrossWordWrapper = styled.div`
  margin-top: 2em;
  max-width: 30em;
  /* and some fun making use of the defined class names */
  .crossword.correct {
    rect {
      stroke: rgb(100, 200, 100) !important;
    }
    svg > rect {
      fill: rgb(100, 200, 100) !important;
    }
    text {
      fill: rgb(100, 200, 100) !important;
    }
  }
  .clue.correct {
    ::before {
      content: "\u2713"; /* a.k.a. checkmark: ✓ */
      display: inline-block;
      text-decoration: none;
      color: rgb(100, 200, 100);
      margin-right: 0.25em;
    }
    text-decoration: line-through;
    color: rgb(130, 130, 130);
  }
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
  padding-right: 2rem;
  padding-left: 2rem;
  margin: -2rem 0;
`;

const Commands = styled.div`
  display: flex;
`;

const CorrectWrapper = styled.div`
  margin-top: 2rem;
  margin-bottom: -1rem;
  font-size: 1.5rem;
`;
