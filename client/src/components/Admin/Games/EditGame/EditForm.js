import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useMutation } from "react-query";

import TextField from "../../../Input/TextField/TextFieldNew";
import ListField from "../../../Input/ListField";
import NumberField from "../../../Input/NumberField";
import ImageField from "../../ImageField";
import SaveBtn from "../../Buttons/Save";

import EditColorGame from "./ColorGame/EditColorGame";

import Typography from "@material-ui/core/Typography";
import axios from "axios";

const EditForm = (props) => {
  const { gamesNames, fields, game, createGame } = props;
  const {
    title,
    description,
    thumbnail,
    age,
    difficulty,
    config,
    assets,
    id,
  } = fields;

  console.log(fields);

  const [curConfig, setCurConfig] = useState(config);
  const [curAssets, setCurAssets] = useState(assets);

  let displayGameEdit = "";
  const configTitle = "Configurações específicas";
  const assetsTitle = "Images específicas";
  if (game === "colorGame") {
    displayGameEdit = (
      <EditColorGame
        createGame={createGame}
        config={curConfig}
        assets={curAssets}
        setConfig={setCurConfig}
        setAssets={setCurAssets}
        configTitle={configTitle}
        assetsTitle={assetsTitle}
      />
    );
  }

  const inputChangeHandler = (userInput, ref) => {
    // console.log(userInput);
    // console.log(ref);
    if (ref.includes("age")) {
      const age_type = ref.split("_")[1];
      fields.age[age_type] = userInput;
    } else {
      fields[ref] = userInput;
    }
  };

  let displaySave = "";
  let URL_str = "";
  if (createGame) {
    const gameObj = gamesNames.find((elem) => elem.game_ref_name === game);
    URL_str = `/api/games/add/${game}/${gameObj.game_ref_id}`;
  } else {
    URL_str = `/api/games/${game}/${fields.id}`;
  }
  const mutation = useMutation((obj) => axios.post(URL_str, obj));

  const performSave = () => {
    const newObj = { ...fields };
    newObj.config = { ...curConfig };
    newObj.assets = { ...curAssets };

    console.log(newObj);

    mutation.mutate(newObj);
  };

  return (
    <Container>
      <Wrapper>
        <Typography variant="h6" gutterBottom>
          Editar Jogo
        </Typography>
        <TextField
          field_ref={"title"}
          label={"Título"}
          value={title}
          parentChangeHandler={inputChangeHandler}
        />
        <TextField
          field_ref={"description"}
          label={"Descrição"}
          value={description}
          parentChangeHandler={inputChangeHandler}
        />
        <ImageField
          field_ref={"thumbnail"}
          imageObj={thumbnail}
          parentChangeHandler={inputChangeHandler}
        />
        <AgeContainer>
          <AgeWrapper>
            <NumberField
              field_ref={"age_min"}
              label={"Idade Mínima"}
              value={age.min}
              parentChangeHandler={inputChangeHandler}
            />
          </AgeWrapper>
          <AgeWrapper>
            <NumberField
              field_ref={"age_max"}
              label={"Idade Máxima"}
              value={age.max}
              parentChangeHandler={inputChangeHandler}
            />
          </AgeWrapper>
        </AgeContainer>
        <ListWrapper>
          <ListField
            field_ref={"difficulty"}
            label={"Dificuldade"}
            arr={["fácil", "média", "difícil"]}
            value={difficulty}
            parentChangeHandler={inputChangeHandler}
          />
        </ListWrapper>

        {/* SPECIFIC GAME SELECTION */}
        {displayGameEdit}
      </Wrapper>
      <SaveBtn clickHandler={performSave}>Guardar</SaveBtn>
    </Container>
  );
};

export default EditForm;

const Container = styled.div`
  width: 100%;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const AgeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const AgeWrapper = styled.div`
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ListWrapper = styled.div`
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SpecificGameField = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UtilsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  margin: 2rem 0;
`;
