import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Img = styled.img`
  /* width: 80%;
  height: 80%; */

  width: 800px;
  height: 600px;
  border-radius: 10px;
`;

export const SliderArrows = styled.div`
  font-size: 3rem;
  color: #000;
  z-index: 10;
  cursor: pointer;
  user-select: none;
`;

export const ArrowLeft = styled.div`
  position: absolute;
  left: 32px;
`;
export const ArrowRight = styled.div`
  position: absolute;
  right: 32px;
`;

const handleSlide = (index, current) => {
  console.log(index == current);
  return index == current;
};

export const SlideWrapper = styled.div`
  ${(props) => {
    if (props.active) {
      return `
        opacity: 1;
        transition-duration: 1s;
        transform: scale(1.02);
      `;
    } else {
      return `
        opacity: 0;
        transition-duration: 1s ease;
      `;
    }
  }}
`;

export const ActiveImg = styled.div``;

export const DesactiveImg = styled.div``;
