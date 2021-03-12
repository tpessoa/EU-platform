import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  background: ${({ lightBg }) => (lightBg ? "#003399" : "#1e3c72")};

  /* ${(props) => {
    if (props.lightBg) {
      return `
        background: #fff;
      `;
    } else {
      return `
        background: #1e3c72; 
        background: -webkit-linear-gradient(to right, #2a5298, #1e3c72); 
        background: linear-gradient(to right, #2a5298, #1e3c72); 
      `;
    }
  }} */

  display: grid;
  margin: 30px 0;
  padding: 100px 10px;
  direction: ${({ reverse }) => (reverse ? "rtl" : "ltr")};

  @media screen and (min-width: 960px) {
    grid-template-columns: 1fr 3fr;
    grid-template-rows: 1fr;
  }

  @media screen and (max-width: 960px) {
    grid-template-rows: 1fr 1fr 1fr;
  }
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.div`
  color: #fff;
  margin: 0 auto;
  margin-bottom: 10px;
`;

export const ImgWrapper = styled.div`
  max-width: 100px;
  max-height: 100px;
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
`;

export const ScrollContainer = styled.div`
  display: grid;
  grid-template-columns: 60px 3fr 60px;
`;

export const VideosWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${({ reverse }) => (reverse ? "flex-end" : "flex-start")};
  overflow: hidden;
  border-radius: 20px;
`;

export const Slide = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  color: #ffcc00;
  width: 100%;
  font-size: 3rem;
  z-index: 3;
`;

export const DisableArrow = styled.div`
  opacity: ${({ disableArrow }) => (disableArrow ? "0.5" : "1")};
  ${(props) => {
    if (props.disableArrow) {
      return `
        opacity: 0.5;
        transition-duration: 1s;
        transform: scale(1.02);
      `;
    } else {
      return `
        opacity: 1;
        transition-duration: 1s ease;
        &:hover {
          box-shadow: 0 0 1px rgba(0, 0, 0, 0);
          transition-duration: 0.3s;
          transition-property: transform;
          transform: scale(1.5);
          opacity: 1;
        }
      `;
    }
  }}
`;

//#ffcc00
export const ShowMore = styled(Link)`
  box-sizing: border-box;
  border: 2px solid $red;
  cursor: pointer;
  border-radius: 10px;
  color: #fff;
  background: #ffcc00;

  padding: 10px 20px;
  font-size: 1rem;

  text-decoration: none;
  text-align: center;
`;

export const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const VideoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
`;
