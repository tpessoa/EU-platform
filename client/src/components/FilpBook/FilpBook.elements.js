import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h1`
  text-align: center;
`;
export const Description = styled.h3`
  text-align: center;
`;

export const BookWrapper = styled.div`
  margin: 50px auto;

  width: 70%;
  height: 70%;

  @media screen and (max-width: 960px) {
    width: 500px;
    height: 300px;
  }

  box-shadow: 10px 10px #888888;
  border: 1px solid;
  overflow: hidden;
  object-fit: contain;
`;

export const UtilsWrapper = styled.div``;
