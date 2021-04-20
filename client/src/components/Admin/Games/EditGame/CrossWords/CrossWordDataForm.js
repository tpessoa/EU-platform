import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { countriesData } from "../../../../../pages/Admin/games/RightAnswersData";

import TextField from "../../../../Input/TextField/TextFieldNew";
import NumberField from "../../../../Input/NumberField/NumberField";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const QuizQuestionForm = (props) => {
  const {
    wordRef,
    title,
    wordInfo,
    wordChanged,
    createNew,
    deleteWord,
    update,
    setUpdate,
  } = props;

  const [currWordObj, setCurrWordObj] = useState(null);

  useEffect(() => {
    const emptyWord = {
      num: null,
      clue: "",
      answer: "",
      row: null,
      col: null,
    };

    // se if is from DB or not
    if (createNew || wordInfo === "addedQuestion") {
      setCurrWordObj(emptyWord);
    } else {
      setCurrWordObj({ ...wordInfo });
    }
  }, []);

  useEffect(() => {
    // pass the object to parent component
    if (currWordObj != null && !update) {
      wordChanged(currWordObj, wordRef);
    }
  }, [currWordObj]);

  useEffect(() => {
    if (update) {
      setCurrWordObj(wordInfo);
      setUpdate(false);
    }
  }, [wordInfo]);

  const objChangeHandler = (userInput, ref) => {
    // console.log(userInput);
    // console.log(ref);
    let userInputFormatted = userInput;
    if (ref === "num" || ref === "row" || ref === "col") {
      userInputFormatted = parseInt(userInput);
    }
    const tempWordObj = { ...currWordObj };
    tempWordObj[ref] = userInputFormatted;
    setCurrWordObj(tempWordObj);
  };

  let display = "";
  if (currWordObj) {
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
            <NumberField
              field_ref={"num"}
              label={"Número da pergunta"}
              value={currWordObj.num}
              parentChangeHandler={objChangeHandler}
            />
            <TextField
              field_ref={"clue"}
              label={"Pista"}
              value={currWordObj.clue}
              parentChangeHandler={objChangeHandler}
            />
            <TextField
              field_ref={"answer"}
              label={"Resposta correta"}
              value={currWordObj.answer}
              parentChangeHandler={objChangeHandler}
            />
            <NumberField
              field_ref={"row"}
              label={"Início da linha"}
              value={currWordObj.row}
              parentChangeHandler={objChangeHandler}
            />
            <NumberField
              field_ref={"col"}
              label={"Início da coluna"}
              value={currWordObj.col}
              parentChangeHandler={objChangeHandler}
            />
          </AccordionDetailsCustom>
        </QuestionContainer>
        <DeleteButton>
          <IconButton aria-label="delete" onClick={() => deleteWord(wordRef)}>
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
