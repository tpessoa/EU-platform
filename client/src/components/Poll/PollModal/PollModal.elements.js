import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  width: 100%;
  min-height: 80vh;
  border-radius: 10px;

  @media screen and (max-width: 960px) {
    flex-direction: column;
  }
`;

export const LeftContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    90deg,
    rgb(39, 176, 255) 0%,
    rgb(0, 232, 236) 100%
  );
  width: 50%;
  min-height: 80vh;

  @media screen and (max-width: 960px) {
    width: 100%;
  }
`;

export const RightContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(90deg, rgb(40, 40, 40) 0%, rgb(17, 17, 17) 100%);
  width: 50%;
  min-height: 80vh;

  @media screen and (max-width: 960px) {
    width: 100%;
  }
`;

export const ContainerWrapper = styled.div`
  width: 95%;

  display: flex;
  justify-content: center;
  align-items: center;

  h3 {
    margin: 1rem 0;
  }

  p {
    margin: 0.5rem 0;
  }

  @media screen and (max-width: 960px) {
    flex-direction: column;
  }
`;

export const InfoWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: 5px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #fff;
  /* background-color: #c9c9c9; */
`;

export const ImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 50vh;
  max-height: 50vh;

  @media screen and (max-width: 960px) {
    max-width: 65vh;
    max-height: 65vh;
  }

  overflow: hidden;
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.3);
`;
