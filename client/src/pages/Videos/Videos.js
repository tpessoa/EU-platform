import React from "react";

import { SliderData, CategoryData } from "./Data";
import ImageSlider from "../../components/ImageSlider";
import VideosList from "../../components/VideosList";

const Videos = () => {
  return (
    <>
      {/* <h1>Destaques</h1>
      <ImageSlider slides={SliderData} /> */}
      {CategoryData.map((categorieInfo, index) => {
        return <VideosList {...categorieInfo} key={index} />;
      })}
    </>
  );
};

export default Videos;
