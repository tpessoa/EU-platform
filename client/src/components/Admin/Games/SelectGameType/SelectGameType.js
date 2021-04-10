import React, { useState, useEffect } from "react";
import { useLocation, Link, useRouteMatch } from "react-router-dom";
import styled from "styled-components";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const SelectGameType = (props) => {
  const { availableGames } = props;
  const { path, url } = useRouteMatch();
  const location = useLocation();

  const [selectedPos, setSelectedPos] = useState(-1);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const splitedURL = location.pathname.split("/");
    const game = splitedURL.pop();
    const gameIndex = availableGames.findIndex(
      (elem) => elem.game_ref_name === game
    );
    setSelectedPos(gameIndex);
  }, [location.pathname]);

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
    <Container>
      <FormControlCustom>
        <InputLabel id="demo-controlled-open-select-label">
          Selecione o tipo de Jogo
        </InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={selectedPos}
          onChange={handleChange}
        >
          {availableGames.map((obj, index) => (
            <MenuItem
              key={index}
              value={index}
              component={Link}
              to={`${url}/${obj.game_ref_name}`}
            >
              {obj.game_name}
            </MenuItem>
          ))}
        </Select>
      </FormControlCustom>
    </Container>
  );
};

export default SelectGameType;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem;
`;

const FormControlCustom = styled(FormControl)`
  && {
    width: 100%;
  }
`;
