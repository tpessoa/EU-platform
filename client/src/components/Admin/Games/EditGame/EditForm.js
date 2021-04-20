import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";

import TextField from "../../../Input/TextField/TextFieldNew";
import ListField from "../../../Input/ListField";
import NumberField from "../../../Input/NumberField";
import ImageField from "../../ImageField";
import SaveBtn from "../../Buttons/Save";
import Loading from "../../../UI/Loading";
import Error from "../../../UI/Error";

import EditColorGame from "./ColorGame/EditColorGame";
import EditPuzzle from "./Puzzle/EditPuzzle";
import EditQuiz from "./Quiz/EditQuiz";
import EditWordSearch from "./WordSearch/EditWordSearch";
import EditInteractiveMaps from "./InteractiveMaps/EditInteractiveMaps";
import EditCrossWords from "./CrossWords/EditCrossWords";

import Typography from "@material-ui/core/Typography";

const generateArray = (min, max) => {
  const tempArr = [];
  for (let i = min; i <= max; i++) {
    tempArr.push(i);
  }
  return tempArr;
};

const EditForm = (props) => {
  const { gamesNames, fields, game, createGame, fetchQuery } = props;
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
  } else if (game === "puzzle") {
    displayGameEdit = (
      <EditPuzzle
        createGame={createGame}
        config={curConfig}
        assets={curAssets}
        setConfig={setCurConfig}
        setAssets={setCurAssets}
        configTitle={configTitle}
        assetsTitle={assetsTitle}
      />
    );
  } else if (game === "quiz") {
    displayGameEdit = (
      <EditQuiz
        generateArray={generateArray}
        createGame={createGame}
        config={curConfig}
        assets={curAssets}
        setConfig={setCurConfig}
        setAssets={setCurAssets}
        configTitle={configTitle}
        assetsTitle={assetsTitle}
      />
    );
  } else if (game === "wordSearch") {
    displayGameEdit = (
      <EditWordSearch
        createGame={createGame}
        config={curConfig}
        assets={curAssets}
        setConfig={setCurConfig}
        setAssets={setCurAssets}
        configTitle={configTitle}
        assetsTitle={assetsTitle}
      />
    );
  } else if (game === "memory") {
  } else if (game === "interactiveMaps") {
    displayGameEdit = (
      <EditInteractiveMaps
        createGame={createGame}
        config={curConfig}
        assets={curAssets}
        setConfig={setCurConfig}
        setAssets={setCurAssets}
        configTitle={configTitle}
        assetsTitle={assetsTitle}
      />
    );
  } else if (game === "crossWords") {
    displayGameEdit = (
      <EditCrossWords
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

  let URL_str = "";
  const gameObj = gamesNames.find((elem) => elem.game_ref_name === game);
  if (createGame) {
    URL_str = `/api/games/add/${game}/${gameObj.game_ref_id}`;
  } else {
    URL_str = `/api/games/${game}/${fields.id}`;
  }

  const queryClient = new useQueryClient();
  const mutation = useMutation((obj) => axios.post(URL_str, obj), {
    onSuccess: () => queryClient.invalidateQueries(fetchQuery),
  });

  const performSave = () => {
    const newObj = { ...fields };
    newObj.config = { ...curConfig };
    newObj.assets = { ...curAssets };

    console.log(newObj);

    // validate fields

    mutation.mutate(newObj);
  };

  let displaySave = "";
  if (mutation.isLoading) {
    displaySave = <Loading />;
  } else if (mutation.isError) {
    displaySave = <Error error={mutation.error} />;
  } else {
    displaySave = (
      <SaveBtn clickHandler={performSave} saved={mutation.isSuccess}>
        Guardar
      </SaveBtn>
    );
  }

  return (
    <Container>
      <Wrapper>
        <Typography variant="h6" gutterBottom>
          {`Editar ${gameObj.game_name}`}
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
          title={`Thumbnail do jogo`}
          field_ref={"thumbnail"}
          imageObj={thumbnail}
          parentChangeHandler={inputChangeHandler}
          linkedObj={id}
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
      {displaySave}
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
