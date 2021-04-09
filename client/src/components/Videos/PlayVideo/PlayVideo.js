import React from "react";

import { Player } from "./PlayVideo.elements";

const PlayVideo = ({ videoURL }) => {
  return (
    <Player
      src={videoURL + "?autoplay=1"}
      frameborder="0"
      allowFullScreen="allowFullScreen"
    />
  );
};

export default PlayVideo;
