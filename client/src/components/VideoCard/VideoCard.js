import React from "react";

import { Container, VideoWrapper } from "./VideoCard.elements";

const VideoCard = () => {
  return (
    <>
      <Container>
        <VideoWrapper
          width="560"
          height="315"
          src="https://www.youtube.com/embed/KLEZMuguanQ"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      </Container>
    </>
  );
};

export default VideoCard;
