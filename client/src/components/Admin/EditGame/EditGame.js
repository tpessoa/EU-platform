import React, { useState, useEffect } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import FieldType from "../FieldType/FieldType";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import { green } from "@material-ui/core/colors";

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

const Container = styled.div`
  width: 100%;
  min-height: 60vh;
  display: flex;
  align-items: center;

  flex-direction: column;
`;

const Wrapper = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ChangeImgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100%;
  margin: 1rem;
`;

const ImgContainer = styled.div`
  width: 250px;
  height: 250px;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const UtilsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  margin: 2rem 0;
`;

// prevents the component from updating each time the user changes the text field
// i.e, its not saved at the component state
var editParams = {};

const EditGame = (props) => {
  const classes = useStyles();
  const { gameInfo } = props;
  const history = useHistory();
  const { gameRef } = useParams();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const idField = query.get("id");

  const [gameParams, setGameParms] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/games/game/${idField}`)
      .then(function (response) {
        setGameParms(response.data);
        // do a copy for the user edit the fields
        // and in the end if the save button is pressed the copy substitutes the original from db
        editParams = { ...response.data };
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [gameRef || idField]);

  const performSave = () => {
    // get all updated fields
    console.log(editParams);
    // validate the params

    // post them to database
    // display feedback
  };

  const textChangeHandler = (ev, ref, updateState) => {
    editParams[ref] = ev.target.value;
  };

  const listChangeHandler = (ev, ref) => {
    editParams[ref] = ev.target.value;
    setGameParms({ ...editParams });
  };

  const ageChangeHandler = (ev, ref) => {
    if (ref === "min") {
      editParams.age.min = ev.target.value;
    } else if (ref === "max") {
      editParams.age.max = ev.target.value;
    }
  };

  return (
    <Container>
      {gameParams && (
        <Wrapper>
          <Button
            variant="contained"
            className={classes.backButton}
            onClick={history.goBack}
          >
            Voltar
          </Button>
          <Typography variant="h6" gutterBottom>
            Editar Jogo
          </Typography>
          {gameInfo.map((obj, index) => {
            return (
              <FieldType
                key={index}
                obj={obj}
                label={obj.ref_name}
                value={gameParams[obj.ref]}
                textChange={textChangeHandler}
                listChange={listChangeHandler}
                ageChange={ageChangeHandler}
              />
            );
          })}
          {/* <TextFieldMulti label={"sigurate"} value={"Nada"} /> */}
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
      )}
    </Container>
  );
};

export default EditGame;
