import styled from "styled-components";
import { Link } from "react-router-dom";

export const CardContainer = styled(Link)`
  background: #fff;
  border-radius: 5px;
  max-width: 300px;
  padding: 2px;
  margin: 5px;
  box-shadow: 0px 0px 15px -5px;
  transition: all 0.3s ease-in;
  text-decoration: none;
  &:hover {
    /* transform: scale(1.05); */
    color: #fff;
    /* color: #ffcc00; */
    box-shadow: 0px 0px 5px 0px;
  }
`;

export const ImgWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
  padding: 5px;
  overflow: hidden;
`;

export const Img = styled.img`
  max-width: 100%;
  max-height: 100%;
  // simple
  /* transform-origin: 0 0; */
  /* transition: all 0.3s ease-in; */

  transition: transform 2s, filter 1.5s ease-in-out;
  transform-origin: center center;
  filter: brightness(80%);

  &:hover {
    // simple
    /* transform: scale(1.2); */

    filter: brightness(100%);
    transform: scale(1.1);
  }
`;

export const ContentWrapper = styled.div`
  color: #000;
  margin: 0.5rem;
`;

export const Title = styled.h1`
  text-align: center;
  font-size: 1.2rem;
`;

export const Description = styled.p`
  margin-top: 0.5rem;
`;
