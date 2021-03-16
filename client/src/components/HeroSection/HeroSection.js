import React from "react";
import {
  HeroContainer,
  HeroBg,
  VideoBg,
  HeroContent,
  HeroH1,
  HeroP,
} from "./HeroSection.elements";

const HeroSection = ({ hero }) => {
  return (
    <HeroContainer>
      <HeroBg>
        <VideoBg autoPlay loop muted src={hero.src} type="video/mp4" />
      </HeroBg>
      <HeroContent>
        <HeroH1>{hero.header}</HeroH1>
        <HeroP>{hero.description}</HeroP>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;
