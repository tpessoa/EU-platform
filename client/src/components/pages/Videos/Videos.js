import React from "react";
import ImageSlider from "../../ImageSlider/ImageSlider";

import { SliderData } from "../../pages/Videos/Data";

const Videos = () => {
  return <ImageSlider slides={SliderData} />;
};

export default Videos;
