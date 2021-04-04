import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import styled from "styled-components";
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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

const SelectGame = (props) => {
  // const { gamesNames, setSelectedGame } = props;
  const { gamesNames, selectedGame } = props;
  const { game } = useParams();
  console.log(selectedGame);
  const classes = useStyles();
  const [selectedPos, setSelectedPos] = useState(-1);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const tempObj = gamesNames.find(
      (elem) => elem.game_ref_name === selectedGame
    );
    if (tempObj) {
      setSelectedPos(tempObj.game_ref_id - 1);
    }
  }, [selectedGame]);

  const handleChange = (event) => {
    setSelectedPos(event.target.value);
    // setSelectedGame(gamesNames[event.target.value]);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Container>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-controlled-open-select-label">Jogos</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={selectedPos}
            onChange={handleChange}
          >
            {gamesNames.map((obj, index) => (
              <MenuItem
                key={index}
                value={index}
                component={Link}
                to={`/admin/games/${obj.game_ref_name}`}
              >
                {obj.game_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Container>
    </div>
  );
};

export default SelectGame;
