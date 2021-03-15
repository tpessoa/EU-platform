import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Card = styled.img`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  filter: brightness(100%);
  transition: all 0.5s;
  -webkit-transition: all 0.5s;

  &:hover {
    filter: brightness(60%);
    transform: scale(1.15);
    transition: all 0.5s;
    -webkit-transition: all 0.5s;
  }
`;

export const CardTopInfo = styled.div`
  border-radius: 0px 0px 10px 10px;
  position: absolute;
  top: -2.5rem;
  left: 0;
  height: 2.5rem;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;

  transition: all 0.5s;
  -webkit-transition: all 0.5s;
`;

export const CardBottomInfo = styled.div`
  border-radius: 10px 10px 0px 0px;
  position: absolute;
  bottom: -3.5rem;
  left: 0;
  height: 3.5rem;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;

  transition: all 0.5s;
  -webkit-transition: all 0.5s;
`;

export const CardWrapper = styled.div`
  width: 330px;
  height: 330px;
  overflow: hidden;
  background-color: #000;
  border-radius: 5px;

  display: flex;
  flex-direction: column;
  position: relative;

  &:hover ${CardBottomInfo} {
    bottom: 0;
    transition: all 0.5s;
    -webkit-transition: all 0.5s;
  }

  &:hover ${CardTopInfo} {
    top: 0;
    transition: all 0.5s;
    -webkit-transition: all 0.5s;
  }
  font-size: 1.4rem;
`;

export const Author = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-left: 2rem;
`;
export const Votes = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30%;
  margin-right: 1rem;
`;
export const VoteIcon = styled.div`
  color: #ffcc00;
  margin-left: 0.5rem;
`;
