import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { useParams, Link, useRouteMatch, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const SelectGame = (props) => {
  const { allQuizes, gameId } = props;
  const { path, url } = useRouteMatch();
  const classes = useStyles();
  const [gameValue, setGameValue] = useState("");

  useEffect(() => {
    const gameIdIndex = allQuizes.findIndex((elem) => elem._id === gameId);
    setGameValue(gameIdIndex);
  }, [gameId]);

  const handleChange = (event) => {
    setGameValue(event.target.value);
  };

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="demo-simple-select-outlined-label">Jogo</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={gameValue}
        onChange={handleChange}
        label="Id do jogo"
      >
        {allQuizes.map((quiz, index) => (
          <MenuItem
            key={index}
            value={index}
            component={Link}
            to={`${url}/${quiz._id}`}
          >
            {quiz.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectGame;
