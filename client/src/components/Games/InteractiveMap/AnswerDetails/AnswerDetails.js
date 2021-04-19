import React from "react";
import styled from "styled-components";

import { countriesData } from "../../../../pages/Admin/games/RightAnswersData";

const ContryDetails = (props) => {
  const { selectedCountry, currQuestion } = props;

  const rightCountryAnswerObj = countriesData[currQuestion.rightAnswer];

  return (
    <Container>
      <AnswerSelectedWrapper>
        País selecionado: {selectedCountry}
      </AnswerSelectedWrapper>
      <RightAnswerWrapper>
        País correto: {rightCountryAnswerObj.country}
      </RightAnswerWrapper>
      <JustificationWrapper>
        Justificação: {currQuestion.justification}
      </JustificationWrapper>
    </Container>
  );
};

export default ContryDetails;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;

  @media screen and (max-width: 960px) {
    align-items: center;
  }
`;

const AnswerSelectedWrapper = styled.div`
  font-size: 1rem;
  margin: 1rem;
`;

const RightAnswerWrapper = styled.div`
  font-size: 1rem;
  margin: 1rem;
`;

const JustificationWrapper = styled.div`
  font-size: 1rem;
  margin: 1rem;
`;
