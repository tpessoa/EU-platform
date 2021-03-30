import React, { useState, useEffect } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import FieldType from "../FieldType/FieldType";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(2),
    padding: theme.spacing(1.5),
  },
  deleteButton: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(0.8),
  },
  backButton: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
  },
}));

const EditGame = (props) => {
  const { gamesNames, gameInfo, specificGameInfo } = props;
  const classes = useStyles();
  const history = useHistory();
  const { gameRef } = useParams();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const idField = query.get("id");

  const [gameParams, setGameParms] = useState(null);
  const [gameType, setGameType] = useState(null);
  const [success, setSuccess] = useState(false);
  const [createGame, setCreateGame] = useState(null);

  useEffect(() => {
    if (idField === "createNew") {
      setCreateGame(true);

      setGameType({ ...specificGameInfo[gameRef].info });
      setGameParms({ ...specificGameInfo[gameRef].defaultInputs });
    } else {
      setCreateGame(false);
      axios
        .get(`/api/games/game/${idField}`)
        .then(function (res) {
          console.log(res.data);

          setGameType({ ...specificGameInfo[gameRef].info });
          setGameParms({ ...res.data });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [gameRef || idField]);

  const performSave = (ev) => {
    console.log("saving");
    ev.preventDefault();
    // get all updated fields
    console.log(gameParams);
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
      .post(URL_str, { gameObj: gameParams })
      .then(function (res) {
        console.log(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    // display feedback
    setSuccess(true);
  };

  const textChangeHandler = (ev, ref, paramType) => {
    if (!gameParams) return;
    let tempObj = { ...gameParams };
    if (paramType === "config") {
      tempObj.config[ref] = ev.target.value;
    } else if (paramType === "assets") {
      tempObj.assets[ref] = ev.target.value;
    } else {
      tempObj[ref] = ev.target.value;
    }
    setGameParms(tempObj);
  };

  const listChangeHandler = (ev, ref) => {
    if (!gameParams) return;
    let tempObj = { ...gameParams };
    tempObj[ref] = ev.target.value;
    setGameParms(tempObj);
  };

  const ageChangeHandler = (ev, ref) => {
    if (!gameParams) return;
    let tempObj = { ...gameParams };
    if (ref === "min") {
      tempObj.age.min = ev.target.value;
    } else if (ref === "max") {
      tempObj.age.max = ev.target.value;
    }
    setGameParms(tempObj);
  };

  const imageChangeHandler = (obj, ref) => {
    if (!gameParams) return;

    let tempObj = { ...gameParams };

    if (obj != null) {
      tempObj.assets.images[ref] = { ...obj };
      setGameParms(tempObj);
    }
  };

  let menu = "";
  if (success) {
    menu = <p>Sucesso</p>;
  } else if (!success && gameType && gameParams) {
    menu = (
      <Wrapper>
        <Typography variant="h6" gutterBottom>
          Editar Jogo
        </Typography>
        {gameInfo.info.map((obj, index) => {
          return (
            <FieldType
              key={index}
              obj={obj}
              label={obj.label}
              value={gameParams[obj.ref]}
              textChange={textChangeHandler}
              listChange={listChangeHandler}
              ageChange={ageChangeHandler}
            />
          );
        })}

        {gameType.assets.images.map((obj, index) => {
          return (
            <FieldType
              key={index}
              obj={obj}
              label={obj.label}
              value={gameParams.assets.images[obj.ref]}
              imageChange={imageChangeHandler}
              type={"assets"}
            />
          );
        })}

        {gameType.config.map((obj, index) => {
          return (
            <FieldType
              key={index}
              obj={obj}
              label={obj.label}
              value={gameParams.config[obj.ref]}
              textChange={textChangeHandler}
              listChange={listChangeHandler}
              ageChange={ageChangeHandler}
              type={"config"}
            />
          );
        })}

        <UtilsWrapper>
          <Button
            variant="contained"
            size="small"
            className={classes.button}
            startIcon={<SaveIcon />}
            onClick={performSave}
          >
            Guardar
          </Button>
        </UtilsWrapper>
      </Wrapper>
    );
  }

  return (
    <Container>
      <Button
        variant="contained"
        className={classes.backButton}
        onClick={history.goBack}
      >
        Voltar
      </Button>
      {menu}
    </Container>
  );
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

const UtilsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  margin: 2rem 0;
`;
