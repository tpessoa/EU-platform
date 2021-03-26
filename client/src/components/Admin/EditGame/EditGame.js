import React, { useState, useEffect } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(32),
      height: theme.spacing(22),
    },
  },
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

const TextFieldCustom = styled(TextField)`
  && {
    margin: 0.7rem;
    width: 80%;
  }
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

const EditGame = (props) => {
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
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [gameRef || idField]);

  return (
    <Container>
      {gameParams &&
        gameInfo.map((field, index) => {
          return (
            <TextFieldCustom
              key={index}
              required
              id="outlined-required"
              label={field}
              defaultValue={gameParams[field]}
              variant="outlined"
            />
          );
        })}
    </Container>
  );
};

export default EditGame;
