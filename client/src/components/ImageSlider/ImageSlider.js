import React, { useState } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import {
  Container,
  SliderWrapper,
  Img,
  SliderArrows,
  ArrowLeft,
  ArrowRight,
  SlideWrapper,
  Slide,
} from "./ImageSlider.elements";

const ImageSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current == length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current == 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <Container>
      <SliderWrapper>
        <SliderArrows>
          <ArrowLeft>
            <FaArrowAltCircleLeft onClick={prevSlide} />
          </ArrowLeft>
        </SliderArrows>
        <SlideWrapper>
          {slides.map((slide, index) => {
            return (
              <Slide active={index === current} key={index}>
                {index === current && (
                  <Img src={slide.image} alt={"image " + index} />
                )}
              </Slide>
            );
          })}
        </SlideWrapper>
        <SliderArrows>
          <ArrowRight>
            <FaArrowAltCircleRight onClick={nextSlide} />
          </ArrowRight>
        </SliderArrows>
      </SliderWrapper>
    </Container>
  );
};

export default ImageSlider;
