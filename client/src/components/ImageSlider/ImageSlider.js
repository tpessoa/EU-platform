import React, { useState } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import {
  Container,
  Img,
  SliderArrows,
  ArrowLeft,
  ArrowRight,
  SlideWrapper,
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
  console.log(current);

  return (
    <Container>
      <SliderArrows>
        <ArrowLeft>
          <FaArrowAltCircleLeft onClick={prevSlide} />
        </ArrowLeft>
        <ArrowRight>
          <FaArrowAltCircleRight onClick={nextSlide} />
        </ArrowRight>
      </SliderArrows>
      {slides.map((slide, index) => {
        return (
          <SlideWrapper active={index === current}>
            {index === current && (
              <Img src={slide.image} alt={"image " + index} />
            )}
          </SlideWrapper>
        );
      })}
    </Container>
  );
};

export default ImageSlider;
