import React from "react";

import { Player } from "./PlayVideo.elements";

const PlayVideo = ({ video_url }) => {
  return (
    <>
      {video_url && (
        <Player
          src={video_url + "?autoplay=1"}
          frameborder="0"
          allowFullScreen="allowFullScreen"
        />
      )}
    </>
  );
};

export default PlayVideo;
