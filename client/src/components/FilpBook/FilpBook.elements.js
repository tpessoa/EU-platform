import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  overflow: hidden;
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h1`
  text-align: center;
`;
export const Description = styled.h3`
  text-align: center;
`;

export const BookContainer = styled.div`
  width: 75%;
  height: 90%;
  margin: 30px 0;

  @media screen and (max-width: 960px) {
    width: 80%;
    margin: 15px 0;
  }

  @media screen and (max-width: 600px) {
    width: 90%;
    margin: 10px 0;
  }
`;

export const BookWrapper = styled.div`
  overflow: hidden;
  /* object-fit: contain; */

  border: 1px solid;
  padding: 0 2px 0 2px;
  background: #c0c0c0;

  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.8);

  @media screen and (max-width: 960px) {
    box-shadow: 5px 5px #888888;
  }

  @media screen and (max-width: 600px) {
    box-shadow: 2px 2px #888888;
  }
`;

export const UtilsWrapper = styled.div``;

export const Page = styled.div`
  background: #c0c0c0;
  /* opacity: 0.2 */
  overflow: hidden;
`;

export const Img = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
`;

export const PageCounter = styled.p`
  margin-top: 20px;
`;
