import React from "react";
import { SliderData, Categories } from "./Data";
import ImageSlider from "../../components/ImageSlider";
import VideosList from "../../components/VideosList";

const Videos = () => {
  return (
    <>
      <h1>Destaques</h1>
      <ImageSlider slides={SliderData} />
      <VideosList title={Categories} lightBg={false} />
      <VideosList title={Categories} lightBg={true} />
      <VideosList title={Categories} lightBg={false} />
    </>
  );
};

export default Videos;
