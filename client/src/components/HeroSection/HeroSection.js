import React from "react";
import {
  HeroContainer,
  HeroBg,
  VideoBg,
  HeroContent,
  HeroH1,
  HeroP,
} from "./HeroSection.elements";
import video from "../../videos/eu-flag-video.mp4";

const HeroSection = ({ header, description }) => {
  return (
    <HeroContainer>
      <HeroBg>
        <VideoBg autoPlay loop muted src={video} type="video/mp4" />
      </HeroBg>
      <HeroContent>
        <HeroH1>{header}</HeroH1>
        <HeroP>{description}</HeroP>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;
