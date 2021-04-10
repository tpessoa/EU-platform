import React, { useState, useEffect } from "react";
import { useParams, useLocation, useHistory, Redirect } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import EditQuiz from "./Quiz/EditQuiz";
import EditColorGame from "./ColorGame/EditColorGame";
import EditPuzzle from "./Puzzle/EditPuzzle";
import EditWordSearch from "./WordSearch/EditWordSearch";

import TextField from "../../../Input/TextField";
import ListField from "../../../Input/ListField";
import NumberField from "../../../Input/NumberField";
import ImageField from "../../ImageField";

import Typography from "@material-ui/core/Typography";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const generateArray = (min, max) => {
  const tempArr = [];
  for (let i = min; i <= max; i++) {
    tempArr.push(i);
  }
  return tempArr;
};

const EditGame = (props) => {
  const { gamesNames } = props;
  const history = useHistory();
  const { gameRef } = useParams();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const idField = query.get("id");

  const [success, setSuccess] = useState(false);
  const [createGame, setCreateGame] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState({
    id: "defaultImage",
    path: "",
    server_path: "",
  });
  const [age, setAge] = useState({ min: "", max: "" });
  const [difficulty, setDifficulty] = useState("");
  const [config, setConfig] = useState(null);
  const [assets, setAssets] = useState(null);

  useEffect(() => {
    if (idField === "createNew") {
      setCreateGame(true);
      setConfig({ null: null });
      setAssets({ null: null });
    } else {
      setCreateGame(false);
      axios
        .get(`/api/games/game/${idField}`)
        .then(function (res) {
          console.log(res.data);

          setTitle(res.data.title);
          setDescription(res.data.description);
          setAge(res.data.age);
          setThumbnail(res.data.thumbnail);
          setDifficulty(res.data.difficulty);
          if (res.data.config) {
            setConfig({ ...res.data.config });
          } else {
            setConfig({ null: null });
          }
          if (res.data.assets) {
            setAssets({ ...res.data.assets });
          } else {
            setAssets({ null: null });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [gameRef || idField]);

  const performSave = (ev) => {
    console.log("saving");
    ev.preventDefault();
    // mount object to send to database
    const gameObj = {
      title: title,
      description: description,
      thumbnail: thumbnail,
      age: age,
      difficulty: difficulty,
      assets: assets,
      config: config,
    };
    console.log(gameObj);

    // validate the params

    let URL_str = "";
    if (createGame) {
      const gameObj = gamesNames.find((obj) => obj.game_ref_name === gameRef);
      URL_str = `/api/games/add/${gameRef}/${gameObj.game_ref_id}`;
    } else {
      URL_str = `/api/games/${gameRef}/${idField}`;
    }

    // post them to database
    axios
      .post(URL_str, { gameObj: gameObj })
      .then(function (res) {
        console.log(res.data);
        window.location = `/admin/games/${gameRef}/success`;
      })
      .catch(function (error) {
        console.log(error);
        window.location = `/admin/games/${gameRef}/error`;
      });
    // display feedback
    setSuccess(true);
  };

  const textChangeHandler = (ev, ref) => {
    const userInput = ev.target.value;
    if (ref === "title") {
      setTitle(userInput);
    } else if (ref === "description") {
      setDescription(userInput);
    } else if (ref.includes("age")) {
      const age_type = ref.split("_")[1];
      const tempObj = { ...age };
      // convert to int
      tempObj[age_type] = parseInt(userInput);
      setAge({ ...tempObj });
    } else if (ref === "difficulty") {
      setDifficulty(userInput);
    }
  };

  const imageChangeHandler = (obj, ref) => {
    setThumbnail({ ...obj });
  };

  let displayGameEdit = "";
  const configTitle = "Configurações específicas";
  const assetsTitle = "Images específicas";
  if (gameRef === "colorGame") {
    displayGameEdit = (
      <EditColorGame
        createGame={createGame}
        config={config}
        setConfig={setConfig}
        assets={assets}
        setAssets={setAssets}
        configTitle={configTitle}
        assetsTitle={assetsTitle}
      />
    );
  } else if (gameRef === "puzzle") {
    displayGameEdit = (
      <EditPuzzle
        createGame={createGame}
        config={config}
        setConfig={setConfig}
        assets={assets}
        setAssets={setAssets}
        configTitle={configTitle}
        assetsTitle={assetsTitle}
      />
    );
  } else if (gameRef === "quiz") {
    displayGameEdit = (
      <EditQuiz
        generateArray={generateArray}
        createGame={createGame}
        config={config}
        setConfig={setConfig}
        assets={assets}
        setAssets={setAssets}
        configTitle={configTitle}
        assetsTitle={assetsTitle}
      />
    );
  } else if (gameRef === "wordSearch") {
    displayGameEdit = (
      <EditWordSearch
        createGame={createGame}
        config={config}
        setConfig={setConfig}
        assets={assets}
        setAssets={setAssets}
        configTitle={configTitle}
        assetsTitle={"Images do Jogo"}
      />
    );
  } else if (gameRef === "memory") {
  }

  let menu = "";
  if (success) {
    menu = <CircularProgress />;
  } else if (!success) {
    menu = (
      <>
        <Button variant="contained" onClick={history.goBack}>
          Voltar
        </Button>
        <Wrapper>
          <Typography variant="h6" gutterBottom>
            Editar Jogo
          </Typography>
          <TextField
            field_ref={"title"}
            label={"Título"}
            value={title}
            parentChangeHandler={textChangeHandler}
          />
          <TextField
            field_ref={"description"}
            label={"Descrição"}
            value={description}
            parentChangeHandler={textChangeHandler}
          />
          <ImageField
            field_ref={"thumbnail"}
            imageObj={thumbnail}
            parentChangeHandler={imageChangeHandler}
          />
          <AgeContainer>
            <AgeWrapper>
              <NumberField
                field_ref={"age_min"}
                label={"Idade Mínima"}
                value={age.min}
                parentChangeHandler={textChangeHandler}
              />
            </AgeWrapper>
            <AgeWrapper>
              <NumberField
                field_ref={"age_max"}
                label={"Idade Máxima"}
                value={age.max}
                parentChangeHandler={textChangeHandler}
              />
            </AgeWrapper>
          </AgeContainer>
          <ListWrapper>
            <ListField
              field_ref={"difficulty"}
              label={"Dificuldade"}
              arr={["fácil", "média", "difícil"]}
              value={difficulty}
              parentChangeHandler={textChangeHandler}
            />
          </ListWrapper>

          {/* SPECIFIC GAME SELECTION */}

          {createGame != null && config && assets && displayGameEdit}
        </Wrapper>
        <UtilsWrapper>
          <Button
            variant="contained"
            size="small"
            startIcon={<SaveIcon />}
            onClick={performSave}
          >
            Guardar
          </Button>
        </UtilsWrapper>
      </>
    );
  }

  return <Container>{menu}</Container>;
};

export default EditGame;

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
