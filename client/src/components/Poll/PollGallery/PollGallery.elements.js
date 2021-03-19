import styled from "styled-components";

export const Container = styled.div`
  min-height: 80vh;
  padding: 40px;
  /* background-color: #1e3c72; */
  @media screen and (max-width: 600px) {
    padding: 20px;
  }
`;

export const GalleryWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(330px, max-content));
  grid-gap: 20px;
  justify-content: center;
  align-items: center;
`;

export const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5vh;
`;
