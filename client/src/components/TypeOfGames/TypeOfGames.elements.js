import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const GamesItemsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

export const GameItem = styled(Link)`
  text-decoration: none;
  color: #003399;
  margin-right: 20px;
  padding: 10px;
  /* background: red; */
  /* &:hover {
    background: #ffcc00;
  } */

  background: ${(props) => props.highlight};

  /* &:target {
    background: red;
  }

  &::selection {
  } */
  /* &:active {
    background-color: #ffcc00;
  } */
`;
export const GameIcon = styled.div`
  font-size: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const GameName = styled.div`
  text-align: center;
`;
