import React, { useState, useEffect } from "react";
import styled from "styled-components";

import TextField from "../../../Input/TextField/TextField2";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const Word = (props) => {
  const { word, index, deleteHandler } = props;

  return (
    <Container>
      <WordWrapper>
        {/* <TextFieldCustom
          required
          id="outlined-required"
          label={"Palavra " + index}
          value={word}
          variant="outlined"
          onChange={handleChange}
        /> */}
        {/* <TextField
          id="outlined-required"
          label={"Palavra " + index}
          value={word}
          variant="outlined"
          disabled={true}
        /> */}
        <p>{word}</p>
      </WordWrapper>
      <RemoveWrapper>
        <IconButton aria-label="delete" onClick={() => deleteHandler(index)}>
          <DeleteIcon />
        </IconButton>
      </RemoveWrapper>
    </Container>
  );
};

export default Word;

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  margin: 0.8rem;
`;

const RemoveWrapper = styled.div`
  position: absolute;
  right: 1rem;
`;
const WordWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const TextFieldCustom = styled(TextField)``;
