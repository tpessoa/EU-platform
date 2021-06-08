import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;
`;

export const ImgWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  padding: 3px;
  width: 100%;
  height: 100%;
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
`;

export const ContentWrapper = styled.div`
  text-decoration: none;
  color: #ffffff;
  text-align: center;
  font-size: 1.2rem;
`;

export const ContentTop = styled.div`
  position: absolute;
  top: -3rem;
  left: 0;
  width: 100%;
  height: 3rem;

  display: none;
  align-items: center;
  justify-content: center;
`;

export const ContentBottom = styled.div`
  position: absolute;
  bottom: -3rem;
  left: 0;
  width: 100%;
  height: 3rem;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: all 0.5s;
  -webkit-transition: all 0.5s;
`;

export const Icon = styled.div`
  position: absolute;
  bottom: -30%;
  left: 4px;
  width: 100%;
  height: 3rem;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: all 0.5s;
  -webkit-transition: all 0.5s;

  font-size: 2.5rem;
  color: #ffcc00;

  animation-duration: 1.5s;
  &:hover {
    animation-name: bounce-5;
    animation-timing-function: ease;
  }
  @keyframes bounce-5 {
    0% {
      transform: scale(1, 1) translateY(0);
    }
    10% {
      transform: scale(1.1, 0.9) translateY(0);
    }
    30% {
      transform: scale(0.9, 1.1) translateY(-20px);
    }
    50% {
      transform: scale(1, 1) translateY(0);
    }
    57% {
      transform: scale(1, 1) translateY(-7px);
    }
    64% {
      transform: scale(1, 1) translateY(0);
    }
    100% {
      transform: scale(1, 1) translateY(0);
    }
  }
`;

export const Title = styled.p`
  width: 90%;
`;

export const Description = styled.p`
  width: 90%;
`;

export const Card = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;

  background: ${(props) => props.color};
  width: 300px;
  height: 220px;

  border-radius: 5px;
  border: 2px solid;
  border-color: ${(props) => props.color};

  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.3);

  transition: all 0.5s;
  -webkit-transition: all 0.5s;
  &:hover {
    transition: all 0.5s;
    -webkit-transition: all 0.5s;
  }

  &:hover ${ImgWrapper} {
    transition: all 0.5s;
    -webkit-transition: all 0.5s;
    filter: brightness(33%);
  }

  &:hover ${ContentTop} {
    display: flex;
    top: 0;
    transition: all 0.5s;
    -webkit-transition: all 0.5s;
  }

  &:hover ${ContentBottom} {
    bottom: 0;
    transition: all 0.5s;
    -webkit-transition: all 0.5s;
  }

  &:hover ${Icon} {
    bottom: 39%;
    transition: all 0.5s;
    -webkit-transition: all 0.5s;
  }
`;

// export const CardContainer = styled(Link)`
//   background: #fff;
//   border-radius: 5px;
//   max-width: 300px;
//   padding: 2px;
//   margin: 5px;
//   box-shadow: 0px 0px 15px -5px;
//   transition: all 0.3s ease-in;
//   text-decoration: none;
//   &:hover {
//     /* transform: scale(1.05); */
//     color: #fff;
//     /* color: #ffcc00; */
//     box-shadow: 0px 0px 5px 0px;
//   }
// `;

// export const ImgWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin: 5px;
//   padding: 5px;
//   overflow: hidden;
// `;

// export const Img = styled.img`
//   max-width: 100%;
//   max-height: 100%;
//   // simple
//   /* transform-origin: 0 0; */
//   /* transition: all 0.3s ease-in; */

//   transition: transform 2s, filter 1.5s ease-in-out;
//   transform-origin: center center;
//   filter: brightness(80%);

//   &:hover {
//     // simple
//     /* transform: scale(1.2); */

//     filter: brightness(100%);
//     transform: scale(1.1);
//   }
// `;

// export const ContentWrapper = styled.div`
//   color: #000;
//   margin: 0.5rem;
// `;

// export const Title = styled.h1`
//   text-align: center;
//   font-size: 1.2rem;
// `;

// export const Description = styled.p`
//   margin-top: 0.5rem;
// `;
