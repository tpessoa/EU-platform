import styled from "styled-components";

export const Container = styled.div``;

export const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Title = styled.h1`
  text-align: center;
  margin: 30px 0 20px 0;
`;

export const Description = styled.div`
  text-align: center;
  margin: 20px 0 20px 0;
`;

export const ImgWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 40vh;
  max-width: 40vh;
  margin-bottom: 30px;
  overflow: hidden;
`;
export const CategoryImg = styled.img`
  width: 100%;
  height: 100%;
`;

export const VideosContainer = styled.div`
  background: #1e3c72;
  min-height: 500px;
  justify-content: center;
`;

export const VideosWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, max-content));
  justify-content: center;
`;
