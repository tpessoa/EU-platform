import styled from "styled-components";

// export const Container = styled.div`
//   display: flex;

//   justify-content: center;

//   /* position: relative;
//   left: ${(props) => props.left}px; */
// `;
export const VideoWrapper = styled.iframe`
  max-width: 250px;
  max-height: 140px;
  margin: 20px;
  border: none;
`;
// export const ImgWrapper = styled.div`
//   width: 250px;
//   margin-top: 27%;
//   overflow: hidden;

//   &:hover {
//     display: inline-block;
//     vertical-align: middle;
//     box-shadow: 0 0 1px rgba(0, 0, 0, 0);
//     transition-duration: 0.3s;
//     transition-property: transform;
//     transform: scale(1.1);
//     opacity: 0.5;
//   }
// `;

// export const YoutubeIcon = styled.div`
//   display: flex;
//   align-items: center;
//   position: relative;
//   left: 50%;
//   top: 5px;

//   font-size: 3rem;
// `;

// export const Img = styled.img`
//   width: 100%;
//   height: 73%;
//   object-fit: cover;

//   border-radius: 8px;
// `;

export const Container = styled.div`
  display: grid;
  margin: 20px;
`;

export const ImgWrapper = styled.div`
  grid-area: 1/ 1/ 4/ 4;
`;

export const YoutubeIcon = styled.div`
  grid-area: 2/ 2/ 3/ 3;
  z-index: 1;
  font-size: 3rem;
  color: red;
`;

export const Img = styled.img`
  object-fit: cover;
  width: 300px;
  height: 170px;
  border-radius: 10px;

  &:hover {
    box-shadow: 0 0 1px rgba(0, 0, 0, 0);
    transition-duration: 0.3s;
    transition-property: transform;
    transform: scale(1.05);
    opacity: 0.5;
  }
`;
