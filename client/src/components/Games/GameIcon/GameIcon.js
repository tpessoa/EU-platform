import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

const GameIcon = (props) => {
  const { game, index, setItem, itemActive } = props;

  return (
    <Container>
      <Item
        to={game.url}
        onClick={() => setItem(index)}
        highlight={itemActive === index ? "activate" : ""}
      >
        <Icon>{game.icon}</Icon>
        <Title>{game.name}</Title>
      </Item>
    </Container>
  );
};

export default GameIcon;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Item = styled(Link)`
  text-decoration: none;
  color: #003399;
  margin-right: 20px;
  padding: 10px;

  background: ${(props) =>
    props.highlight === "activate" ? "#ffcc00" : "transparent"};
`;
export const Icon = styled.div`
  font-size: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.div`
  margin-top: 0.5rem;
  text-align: center;
`;
