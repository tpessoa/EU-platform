import React, { useState, useEffect } from "react";
import styled from "styled-components";

import NumberField from "../../../Input/NumberField";
import CheckboxField from "../../../Input/CheckboxField";
import Word from "./Word";

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
};

const EditWordSearch = (props) => {
  const { createGame, config, setConfig } = props;
  const [loadedCompleted, setLoadedCompleted] = useState(false);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    if (createGame) {
      setConfig({ ...emptyWordSearchConfig });
    }
    setLoadedCompleted(true);
  }, []);

  const directionsHandler = (checkedFlag, ref) => {
    const tempConfig = { ...config };
    const directionObj = tempConfig.directions.find(
      (obj) => obj.direction === ref
    );
    directionObj.checked = checkedFlag;
    setConfig(tempConfig);
  };

  const numberHandler = (ev, ref) => {
    console.log(ev.target.value);
    console.log(ref);

    const tempConfig = { ...config };
    tempConfig[ref] = parseInt(ev.target.value);
    setConfig(tempConfig);
  };

  const textHandler = (word, ref) => {
    console.log(word);
    console.log(ref);

    const tempConfig = { ...config };
    if (ref.type === "word") {
      tempConfig.words[ref.index] = word;
    }
    setConfig(tempConfig);
  };

  const addWord = () => {
    const tempConfig = { ...config };
    tempConfig.words.push("");
    setConfig(tempConfig);
  };

  let display = "";
  if (loadedCompleted) {
    display = (
      <>
        <WordsContainer>
          {config.words.map((word, index) => {
            return (
              <Word
                key={index}
                word={word}
                index={index}
                textChangeHandler={textHandler}
              />
            );
          })}
          <button onClick={addWord}>Adicionar Palavra</button>
        </WordsContainer>
        <CheckboxesContainer>
          <h1>Direções</h1>
          {config.directions.map((obj, index) => {
            return (
              <CheckboxField
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
              value={timerActive}
              description={"Ativar"}
              setHandler={setTimerActive}
            />
          </TimeCheckboxContainer>

          <TimeValueCheckboxContainer>
            <NumberField
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

const WordsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
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
