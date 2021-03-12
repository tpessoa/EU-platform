import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: grid;
  margin: 20px;
  position: relative;
  left: ${(props) => `${props.left}px`};
  transition: 0.8s ease;
`;

export const ImgWrapper = styled.div`
  grid-area: 1/ 1/ 4/ 4;
`;

export const YoutubeIcon = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-area: 2/ 2/ 3/ 3;
  z-index: 1;
  font-size: 5rem;
  color: red;

  &:hover {
    box-shadow: 0 0 1px rgba(0, 0, 0, 0);
    transition-duration: 0.3s;
    transition-property: transform;
    transform: scale(1.2);
    opacity: 1;
  }
`;

export const Img = styled.img`
  object-fit: cover;
  width: 300px;
  height: 170px;
  border-radius: 10px;

  ${(props) => {
    if (props.activeFlag) {
      return `
        transition-duration: 0.3s;
        transition-property: transform;
        transform: scale(1.05);
        opacity: 0.5;
      `;
    } else {
      return `
        opacity: 1;
      `;
    }
  }}

  &:hover {
  }
`;
