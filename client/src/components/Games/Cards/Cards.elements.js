import styled from "styled-components";

export const CardsSection = styled.div`
  padding: 30px 0 50px; // padding top - right/left - bottom
  display: flex;
  flex-direction: column;
  /* background: #4b59f7; */
  background: #003399;
  min-height: 60vh;
`;

export const CardsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, max-content));
  grid-gap: 20px;
  margin: 0px 20px;
  justify-content: center;
`;

export const CardsHeading = styled.h1`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  font-size: 2rem;
  margin-bottom: 24px;
`;
