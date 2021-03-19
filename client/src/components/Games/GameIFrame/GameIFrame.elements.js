import styled from "styled-components";

export const GameContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #fff;
  height: 90vh;
  width: 100%;
`;

export const GameWrapper = styled.div`
  height: 100%;
  width: 80%;
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

export const FullScreenBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 20px 30px;
  margin: 20px 0;

  font-size: 1.5rem;
  border: none;
  border-radius: 5px;
  /* border: none; */

  height: 1.5rem;
  font-size: 1.1rem;
  border: none;
  border-radius: 6px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.3);
  background: #ffcc00;
  text-align: center;

  margin-right: 1rem;

  &:focus {
    outline: 0;
  }
`;
