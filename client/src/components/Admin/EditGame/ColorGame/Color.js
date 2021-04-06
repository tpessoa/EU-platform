import React, { useState, useEffect } from "react";
import styled from "styled-components";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { FaCircle } from "react-icons/fa";

const Color = (props) => {
  const { color, index, deleteHandler } = props;
  return (
    <Container>
      <ColorWrapper>
        <p>{color}</p>
      </ColorWrapper>
      <RemoveWrapper>
        <IconButton aria-label="delete" onClick={() => deleteHandler(index)}>
          <DeleteIcon />
        </IconButton>
      </RemoveWrapper>
      <DisplayColorWrapper color={color} />
    </Container>
  );
};

export default Color;

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  margin: 1rem;
`;

const RemoveWrapper = styled.div`
  position: absolute;
  right: 1rem;
`;

const DisplayColorWrapper = styled(FaCircle)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 1rem;
  font-size: 2rem;
  color: ${(props) => props.color};
`;

const ColorWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
