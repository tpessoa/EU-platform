import React, { useState, useEffect } from "react";
import styled from "styled-components";

import TextField from "../../../Input/TextField/TextField2";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const Word = (props) => {
  const { word, index, textChangeHandler } = props;

  return (
    <Container>
      <WordWrapper>
        <TextField
          field_ref={"word_" + index}
          label={"Palavra " + (index + 1)}
          value={word}
          parentChangeHandler={(currentWord) =>
            textChangeHandler(currentWord, { type: "word", index: index })
          }
        />
      </WordWrapper>
      <RemoveWrapper>
        <IconButton aria-label="delete">
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
  width: 60%;
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
