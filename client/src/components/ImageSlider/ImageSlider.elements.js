import styled from "styled-components";

export const Container = styled.div`
  max-width: 500px;
  min-height: 300px;
  padding: 50px 0;
  margin: auto;
`;

export const SliderWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: 250px;
`;

export const SliderArrows = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 2.5rem;
  color: #000;
  z-index: 10;
  cursor: pointer;
  user-select: none;

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const ArrowLeft = styled.div`
  justify-content: flex-start;
`;
export const ArrowRight = styled.div`
  justify-content: flex-end;
`;

export const SlideWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Slide = styled.div`
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

  &:hover {
    opacity: 0.5;
  }
`;

export const Img = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 10px;
  margin: auto;
  display: block;
`;
