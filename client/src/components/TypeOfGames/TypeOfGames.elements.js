import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  background: #fff;
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
  &:hover {
    background: #ffcc00;
  }
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
