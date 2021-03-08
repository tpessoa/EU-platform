import styled from "styled-components";

export const GameContainer = styled.div`
  background: #fff;
  height: 700px;
  width: 100%;
`;

export const GameWrapper = styled.div`
  height: 100%;
  margin: 10px;
  padding: 50px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Game = styled.iframe`
  height: 100%;
  width: 100%;
  border: none;
`;

export const FullScreen = styled.button`
  padding: 10px;
  /* border: none; */
`;
