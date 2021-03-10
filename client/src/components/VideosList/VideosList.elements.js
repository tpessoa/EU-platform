import styled from "styled-components";

export const Container = styled.div`
  background: ${({ lightBg }) => (lightBg ? "#3d49c7" : "#1e3c72")};

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
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 1fr;

  direction: ${({ reverse }) => (reverse ? "rtl" : "ltr")};
  margin: 30px 0;
  padding: 100px 50px;
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

export const VideosWrapper = styled.div`
  /* display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden; */

  display: flex;
  align-items: center;
  justify-content: flex-start;

  overflow: hidden;
`;

export const Slide = styled.div`
  font-size: 2rem;
  z-index: 10;
`;
//#ffcc00
export const ShowMore = styled.button`
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
