import React from "react";
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

  let formattedValue = value;
  if (range_min && range_max) {
    if (parseInt(value) <= range_min) {
      formattedValue = range_min;
    } else if (parseInt(value) >= range_max) {
      formattedValue = range_max;
    } else {
      formattedValue = value;
    }
  }

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
        value={formattedValue}
        onChange={(ev) => parentChangeHandler(ev, field_ref)}
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
`;

export const PopoverWrapper = styled.div`
  position: absolute;
  right: -0.5rem;
`;
export const InfoText = styled(Typography)`
  padding: 0.5rem;
`;
export const InfoIcon = styled.div`
  font-size: 2rem;
`;
