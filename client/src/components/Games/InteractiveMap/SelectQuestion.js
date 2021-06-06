import React, { useState } from "react";
import styled from "styled-components";

import Button from "@material-ui/core/Button";

const pickRandomQuestion = (arr) => {
  return Math.floor(Math.random() * arr.length);
};

const SelectQuestion = (props) => {
  const { questions, setCurrentQuestion } = props;
  const [randomIndex, setRandomIndex] = useState(null);

  const handleBtn = () => {
    const rndIndex = pickRandomQuestion(questions);
    setCurrentQuestion(rndIndex);
    setRandomIndex(rndIndex);
  };

  return (
    <Container>
      <BtnWrapper variant="contained" color="primary" onClick={handleBtn}>
        Pergunta aleatória
      </BtnWrapper>
    </Container>
  );
};

export default SelectQuestion;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 2;
`;

const BtnWrapper = styled(Button)`
  && {
    margin: 2rem;
  }
`;

const QuestionWrapper = styled.div`
  font-size: 1.5rem;
`;

const AnswerWrapper = styled.div`
  font-size: 1rem;
  margin: 1rem;
`;

// {randomIndex != null && (
//   <>
//     <QuestionWrapper>
//       Pergunta: {questions[randomIndex].question}
//     </QuestionWrapper>

//   </>
// )}
