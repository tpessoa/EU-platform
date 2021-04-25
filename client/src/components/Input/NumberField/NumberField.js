import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { TextFieldCustom } from "../Input.elements";

import { FaInfoCircle } from "react-icons/fa";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

const NumberField = (props) => {
  const {
    disabled,
    field_ref,
    label,
    value,
    parentChangeHandler,
    range_min,
    range_max,
    info,
  } = props;

  const [number, setNumber] = useState("");

  useEffect(() => {
    if (value === null) return;
    let tempValue = value;
    if (range_min && range_max) {
      if (parseInt(value) <= range_min) {
        tempValue = range_min;
      } else if (parseInt(value) >= range_max) {
        tempValue = range_max;
      } else {
        tempValue = value;
      }
    }
    setNumber(tempValue);
  }, []);

  const changeHandler = (ev, field_ref) => {
    const userInput = ev.target.value;
    setNumber(userInput);
    parentChangeHandler(userInput, field_ref);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const popoverId = open ? "simple-popover" : undefined;

  let displayInfo = "";
  if (info) {
    displayInfo = (
      <PopoverWrapper>
        <IconButton
          aria-label="delete"
          aria-describedby={popoverId}
          variant="contained"
          color="primary"
          onClick={handleClick}
        >
          <FaInfoCircle />
        </IconButton>
        <Popover
          id={popoverId}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <InfoText>{info}</InfoText>
        </Popover>
      </PopoverWrapper>
    );
  }

  return (
    <Container>
      <TextFieldCustom
        id="outlined-number"
        type="number"
        label={label}
        value={number}
        onChange={(ev) => changeHandler(ev, field_ref)}
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        disabled={disabled}
      ></TextFieldCustom>
      {displayInfo}
    </Container>
  );
};

export default NumberField;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
`;

export const PopoverWrapper = styled.div`
  position: absolute;
  right: -3rem;
`;
export const InfoText = styled(Typography)`
  padding: 0.5rem;
`;
export const InfoIcon = styled.div`
  font-size: 2rem;
`;
