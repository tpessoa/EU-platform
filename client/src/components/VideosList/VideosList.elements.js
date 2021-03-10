import styled from "styled-components";

export const Container = styled.div`
  background: ${({ lightBg }) => (lightBg ? "#fff" : "#003399")};
  display: flex;
  flex-direction: column;
`;

export const VideosWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
`;

export const Title = styled.div`
  color: #fff;
  margin: auto;
`;
