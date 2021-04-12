import React from "react";
import styled from "styled-components";

import leftImage from "../../assets/images/footer/prone.png";
import rightImage from "../../assets/images/footer/eu-flag.png";

const Footer = () => {
  return (
    <Container>
      <Wrapper>
        <RightContainer>
          <ImageWrapperRight>
            <Image src={rightImage} alt={"eu-flag"} />
          </ImageWrapperRight>
          <EUText>
            With the support of the Erasmus+ Programme of the European Union
          </EUText>
        </RightContainer>
        <LeftContainer>
          <ImageWrapper>
            <Image src={leftImage} alt={"prone"} />
          </ImageWrapper>
        </LeftContainer>
      </Wrapper>
    </Container>
  );
};

export default Footer;

export const Container = styled.footer`
  background-color: #101522;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  max-width: 1100px;
  padding: 48px 24px;
  /* flex-direction: column; */

  @media screen and(max-width: 820px) {
    flex-direction: row;
  }
`;

export const LeftContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 2rem;
`;

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 100px;
`;
export const ImageWrapperRight = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  max-width: 90px;
  max-height: 100px;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const RightContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 2rem;
`;

export const EUText = styled.div`
  text-align: justify;
  text-justify: inter-word;
  font-size: 0.9rem;
  max-width: 10rem;
  margin: 1rem;

  color: #fff;
  transition-duration: 0.3s;
  &:hover {
    color: #003399;
  }
`;
