import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 40px;

  @media screen and (max-width: 960px) {
    padding: 0 20px;
  }
`;

export const BookWrapper = styled.div`
  margin: 50px 0;

  width: 150vh;
  height: 80vh;
  box-shadow: 0 0 1em #000;
  border: 1px solid;
`;

export const SinglePage = styled.div`
  padding: 20px 40px;
`;
export const DualPage = styled.div`
  display: grid;
  grid-template-columns: minmax(auto, 50%) minmax(auto, 50%);
  grid-gap: 2rem;

  padding: 20px 40px;
`;

export const PageTitle = styled.h1`
  text-align: center;
  font-size: 2rem;
  padding-top: 15px;
`;

export const PageLeft = styled.div`
  justify-items: center;
`;

export const PageRight = styled.div``;

export const UtilsWrapper = styled.div``;
