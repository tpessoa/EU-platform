import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../Table";
import AssetsList from "../AssetsList";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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

const ListGames = () => {
  const classes = useStyles();
  const [selectedPos, setSelectedPos] = useState(-1);
  const [gamesArr, setGamesArr] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // get all the games
    axios
      .get("/api/games/allGames")
      .then(function (response) {
        setGamesArr(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleChange = (event) => {
    setSelectedPos(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Escolher jogo
      </Typography>
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
          {gamesArr &&
            gamesArr.map((game, index) => {
              return (
                <MenuItem
                  key={index}
                  value={index}
                  component={Link}
                  to={`/admin/upload/${gamesArr[index].ref}`}
                >
                  {game.name}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
      {/* {selectedPos != -1 ? <Table gameSelected={gamesArr[selectedPos]} /> : ""} */}
      {/* {selectedPos != -1 ? (
        <AssetsList gameSelected={gamesArr[selectedPos]} />
      ) : (
        ""
      )} */}
    </>
  );
};

export default ListGames;
