import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { countriesData } from "../../../../../pages/Admin/games/RightAnswersData";

import TextField from "../../../../Input/TextField/TextFieldNew";
import ListField from "../../../../Input/ListField/ListFielCountries";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const QuizQuestionForm = (props) => {
  const {
    questionRef,
    title,
    questionInfo,
    questionChanged,
    createNew,
    deleteQuestion,
    update,
    setUpdate,
  } = props;

  const [currQuestObj, setCurrQuest] = useState(null);

  useEffect(() => {
    const emptyQuestion = {
      question: "",
      rightAnswer: "",
      justification: "",
    };

    // se if is from DB or not
    if (createNew) {
      setCurrQuest(emptyQuestion);
    } else {
      // console.log(questionInfo);
      if (questionInfo === "addedQuestion") {
        setCurrQuest(emptyQuestion);
      } else {
        setCurrQuest({ ...questionInfo });
      }
    }
  }, []);

  useEffect(() => {
    // pass the object to parent component
    if (currQuestObj != null && !update) {
      questionChanged(currQuestObj, questionRef);
    }
  }, [currQuestObj]);

  useEffect(() => {
    if (update) {
      setCurrQuest(questionInfo);
      setUpdate(false);
    }
  }, [questionInfo]);

  const textChange = (userInput, ref) => {
    const tempQuestionObj = { ...currQuestObj };
    tempQuestionObj[ref] = userInput;
    setCurrQuest(tempQuestionObj);
  };

  let display = "";
  if (currQuestObj) {
    display = (
      <Container>
        <QuestionContainer>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{title}</Typography>
          </AccordionSummary>
          <AccordionDetailsCustom>
            <TextField
              field_ref={"question"}
              label={"Questão"}
              value={currQuestObj.question}
              parentChangeHandler={textChange}
            />
            <ListField
              arr={countriesData}
              field_ref={"rightAnswer"}
              label={"Resposta correta"}
              value={currQuestObj.rightAnswer}
              parentChangeHandler={textChange}
            />
            <TextField
              field_ref={"justification"}
              label={"Justificação"}
              value={currQuestObj.justification}
              parentChangeHandler={textChange}
              multi={true}
            />
          </AccordionDetailsCustom>
        </QuestionContainer>
        <DeleteButton>
          <IconButton
            aria-label="delete"
            onClick={() => deleteQuestion(questionRef)}
          >
            <DeleteIcon />
          </IconButton>
        </DeleteButton>
      </Container>
    );
  }

  return <>{display}</>;
};

const DeleteButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const QuestionContainer = styled(Accordion)`
  && {
    width: 95%;
    border-radius: 5px;
    margin: 0.6rem;
  }
`;

const AccordionDetailsCustom = styled(AccordionDetails)`
  && {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`;

const GridWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 90%;
  max-height: 40vh;
  overflow-y: auto;
  margin: 1rem 0;
`;

export default QuizQuestionForm;
