import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

import MapChart from "./MapChart";
import AnswerDetails from "./AnswerDetails";
import Question from "./Question";
import SelectQuestion from "./SelectQuestion";

import styled from "styled-components";

import Loading from "../../UI/Loading";
import Error from "../../UI/Error";
import { useGame } from "../../../hooks/useGames";
import FeedbackAnswer from "./FeedbackAnswer";

const InteractiveMap = () => {
  const [country, setCountry] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState(null);

  // resets when changing the question
  useEffect(() => {
    setCountry(null);
  }, [currentQuestion]);

  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const gameId = query.get("id");

  const game = useGame(gameId);

  if (game.isLoading) return <Loading />;
  if (game.error) return <Error error={game.error} />;

  console.log(userAnswer);

  return (
    <Container>
      <SelectQuestionWrapper>
        <SelectQuestion
          questions={game.data.config.questions}
          setCurrentQuestion={setCurrentQuestion}
        />
      </SelectQuestionWrapper>
      <MainGameWrapper>
        <MapWrapper>
          <MapChart
            // setCountry={setCountry}
            currQuestion={game.data.config.questions[currentQuestion]}
          />
        </MapWrapper>
        <QuestionWrapper>
          {currentQuestion != null && (
            <Question
              question={game.data.config.questions[currentQuestion].question}
            />
          )}
        </QuestionWrapper>
      </MainGameWrapper>
    </Container>
  );
};

export default InteractiveMap;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  margin: 2rem 0 2rem 0;
`;

const SelectQuestionWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -2.5rem;
`;

const MainGameWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
  min-height: 40vh;

  @media screen and (max-width: 960px) {
    flex-direction: column;
  }
`;

const MapWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 55%;

  @media screen and (max-width: 768px) {
    width: 95%;
  }
  @media screen and (max-width: 1100px) {
    width: 85%;
  }
`;

const QuestionWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 5rem;
  left: 1rem;
`;

const FeedbackWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 10rem;
  left: 1rem;
`;

const QuestionInfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45%;

  @media screen and (max-width: 768px) {
    width: 95%;
  }
  @media screen and (max-width: 1100px) {
    width: 40%;
  }
`;
