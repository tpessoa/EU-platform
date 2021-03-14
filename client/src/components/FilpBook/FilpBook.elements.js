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
  margin: 30px 0;

  width: 75%;
  height: 90%;
  overflow: hidden;
  object-fit: contain;

  @media screen and (max-width: 960px) {
    width: 80%;
    margin: 15px 0;
  }

  @media screen and (max-width: 600px) {
    width: 90%;
    margin: 10px 0;
  }

  box-shadow: 10px 10px #888888;
  border: 1px solid;
`;

export const UtilsWrapper = styled.div``;

export const Page = styled.div`
  background: blue;
`;
