import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import styled from "styled-components";
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${({ align }) =>
    align === "filterGame" ? "flex-end" : "flex-start"};
`;

const useStyles = makeStyles((theme) => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  root: {
    width: "100%",
    maxWidth: 500,
  },
}));

const ListGames = ({ listType, setSelectedGame, setUploaded }) => {
  const classes = useStyles();
  const { game } = useParams();
  const [selectedPos, setSelectedPos] = useState(-1);
  const [gamesArr, setGamesArr] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // get all the games
    axios
      .get("/api/games/allGames")
      .then(function (response) {
        setGamesArr(response.data);

        if (listType === "filterGame") {
          setSelectedPos(0);

          // ver melhor isto!
          if (response.data.length > 0) {
            setSelectedGame(response.data[0].ref);
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleChange = (event) => {
    setSelectedPos(event.target.value);

    if (listType === "filterGame" || listType === "uploadImage") {
      setSelectedGame(gamesArr[event.target.value].ref);
    }
  };

  const handleClose = () => {
    setOpen(false);

    if (listType === "uploadImage") {
      setUploaded(false);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  let listActions;
  if (listType === "selectGame" && gamesArr) {
    listActions = gamesArr.map((game, index) => (
      <MenuItem
        key={index}
        value={index}
        component={Link}
        to={`/admin/games/${gamesArr[index].refAll}`}
      >
        {game.name}
      </MenuItem>
    ));
  } else if (listType === "filterGame" && gamesArr) {
    const all = { ref: "all", name: "Todos" };
    const exists = gamesArr.findIndex((x) => x.ref === "all");
    if (exists == -1) {
      gamesArr.unshift(all);
    }
    listActions = gamesArr.map((game, index) => (
      <MenuItem key={index} value={index}>
        {game.name}
      </MenuItem>
    ));
  } else if (listType === "uploadImage" && gamesArr) {
    listActions = gamesArr.map((game, index) => (
      <MenuItem key={index} value={index}>
        {game.name}
      </MenuItem>
    ));
  }

  return (
    <Container align={listType}>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Jogo</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={selectedPos}
          onChange={handleChange}
        >
          {listActions}
        </Select>
      </FormControl>
    </Container>
  );
};

export default ListGames;
