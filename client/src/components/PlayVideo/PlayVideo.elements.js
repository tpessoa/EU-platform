import styled from "styled-components";

export const PlayerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
`;

export const Player = styled.iframe`
  margin: 20px;
  border: none;
  min-width: 885px;
  min-height: 500px;

  @media screen and (max-width: 960px) {
    min-width: 560px;
    min-height: 315px;
  }

  @media screen and (max-width: 640px) {
    min-width: 318px;
    min-height: 180px;
  }
`;
