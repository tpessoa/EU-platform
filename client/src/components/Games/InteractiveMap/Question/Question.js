import React, { useState } from "react";
import styled from "styled-components";

import Button from "@material-ui/core/Button";

const pickRandomQuestion = (arr) => {
  return Math.floor(Math.random() * arr.length);
};

const Question = (props) => {
  const { questions, setCurrentQuestion } = props;
  const [randomIndex, setRandomIndex] = useState(0);

  const handleBtn = () => {
    const rndIndex = pickRandomQuestion(questions);
    setCurrentQuestion(rndIndex);
    setRandomIndex(rndIndex);
  };

  return (
    <Container>
      <Button variant="contained" color="primary" onClick={handleBtn}>
        Pergunta aleatória
      </Button>
      <QuestionWrapper>{questions[randomIndex].question}</QuestionWrapper>
    </Container>
  );
};

export default Question;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const QuestionWrapper = styled.div`
  font-size: 1.5rem;
  margin: 2rem;
`;
