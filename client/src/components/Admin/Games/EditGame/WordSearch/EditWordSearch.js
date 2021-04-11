import React, { useState, useEffect } from "react";
import styled from "styled-components";

import NumberField from "../../../../Input/NumberField";
import TextField from "../../../../Input/TextField/TextField2";
import CheckboxField from "../../../../Input/CheckboxField";
import Word from "./Word";

import Paper from "@material-ui/core/Paper";

const emptyWordSearchConfig = {
  words: [],
  directions: [
    {
      direction: "Down",
      checked: true,
    },
    {
      direction: "Right",
      checked: true,
    },
    {
      direction: "Right-Down",
      checked: false,
    },
    {
      direction: "Left-Down",
      checked: false,
    },
  ],
  num_horizontal_cells: "",
  num_vertical_cells: "",
  time_to_complete: "",
  timer: false,
};

const EditWordSearch = (props) => {
  const { createGame, config, setConfig } = props;
  const [loadedCompleted, setLoadedCompleted] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [addedWord, setAddedWord] = useState("");

  useEffect(() => {
    if (createGame) {
      setConfig({ ...emptyWordSearchConfig });
    }
    setLoadedCompleted(true);
  }, []);

  const directionsHandler = (checkedFlag, ref) => {
    console.log(ref);
    const tempConfig = { ...config };
    const directionObj = tempConfig.directions.find(
      (obj) => obj.direction === ref
    );
    directionObj.checked = checkedFlag;
    setConfig(tempConfig);
  };

  const numberHandler = (userInput, ref) => {
    const tempConfig = { ...config };
    tempConfig[ref] = parseInt(userInput);
    setConfig(tempConfig);
  };

  const timerHandler = (flag, ref) => {
    console.log(flag);
    console.log(ref);
    const tempConfig = { ...config };
    tempConfig[ref] = flag;
    setConfig(tempConfig);

    setTimerActive(flag);
  };

  const deleteWord = (wordIndex) => {
    const tempConfig = { ...config };
    tempConfig.words.splice(wordIndex, 1);
    setConfig(tempConfig);
  };

  const addWordHandler = () => {
    const tempConfig = { ...config };
    tempConfig.words.push(addedWord);
    setConfig(tempConfig);
    setAddedWord("");
  };

  let display = "";
  if (loadedCompleted) {
    display = (
      <>
        <WordsContainer>
          <h3>Palavras</h3>
          {config.words.map((word, index) => {
            return (
              <Word
                key={index}
                word={word}
                index={index}
                deleteHandler={deleteWord}
              />
            );
          })}
          <AddWordContainer>
            <TextField
              label={"Nova Palavra"}
              value={addedWord}
              parentChangeHandler={(word) => setAddedWord(word)}
            />
            <button onClick={addWordHandler}>Adicionar Palavra</button>
          </AddWordContainer>
        </WordsContainer>
        <CheckboxesContainer>
          <h3>Direções</h3>
          {config.directions.map((obj, index) => {
            return (
              <CheckboxField
                field_ref={obj.direction}
                key={index}
                value={obj.checked}
                description={obj.direction}
                setHandler={directionsHandler}
              />
            );
          })}
        </CheckboxesContainer>
        <NumberField
          field_ref={"num_horizontal_cells"}
          label={"Número de células Horizontais"}
          value={config.num_horizontal_cells}
          parentChangeHandler={numberHandler}
        />
        <NumberField
          field_ref={"num_vertical_cells"}
          label={"Número de células Verticais"}
          value={config.num_vertical_cells}
          parentChangeHandler={numberHandler}
        />
        <TimeContainer>
          <TimeCheckboxContainer>
            <CheckboxField
              field_ref={"timer"}
              value={config.timer}
              description={"Ativar"}
              setHandler={timerHandler}
            />
          </TimeCheckboxContainer>

          <TimeValueCheckboxContainer>
            <NumberField
              disabled={!timerActive}
              field_ref={"time_to_complete"}
              label={"Tempo para completar o jogo (segundos)"}
              value={config.time_to_complete}
              parentChangeHandler={numberHandler}
            />
          </TimeValueCheckboxContainer>
        </TimeContainer>
      </>
    );
  }

  return <>{display}</>;
};

export default EditWordSearch;

const CheckboxesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 60%;
`;

const WordsContainer = styled(Paper)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 60%;
  padding: 1rem;
  margin: 1rem;
`;

const AddWordContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 90%;
`;

const TimeContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const TimeCheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30%;
`;
const TimeValueCheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70%;
`;
