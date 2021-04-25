import React from "react";
import { TextFieldCustom } from "../Input.elements";
import styled from "styled-components";

import { FaInfoCircle } from "react-icons/fa";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

const TextField = (props) => {
  const { field_ref, label, value, parentChangeHandler, multi, info } = props;
  const [word, setWord] = React.useState(value);
  const [anchorEl, setAnchorEl] = React.useState(null);

  React.useEffect(() => {
    setWord(value);
  }, [value]);

  const handleChange = (ev) => {
    const userInput = ev.target.value;
    setWord(userInput);
    parentChangeHandler(userInput, field_ref);
  };

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
      <InputWrapper>
        <TextFieldCustom
          required
          id="outlined-required"
          label={label}
          value={word}
          variant="outlined"
          onChange={handleChange}
          multiline={multi}
        />
      </InputWrapper>
      {displayInfo}
    </Container>
  );
};

export default TextField;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
`;

export const InputWrapper = styled.div`
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
