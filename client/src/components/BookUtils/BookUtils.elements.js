import styled from "styled-components";

export const Container = styled.div`
  margin-bottom: 20px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

export const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 50%;

  @media screen and (max-width: 600px) {
    margin-bottom: 5px;
    width: 100%;
    justify-content: center;
  }
`;
export const Sound = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media screen and (max-width: 600px) {
    margin-bottom: 5px;
    width: 100%;
    justify-content: center;
  }
`;
