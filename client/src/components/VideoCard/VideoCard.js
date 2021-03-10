import React, { useState } from "react";

import { FaYoutube } from "react-icons/fa";
import { VideosWrapper } from "../VideosList/VideosList.elements";
import {
  Container,
  VideoWrapper,
  ImgWrapper,
  YoutubeIcon,
  Img,
} from "./VideoCard.elements";

const VideoCard = ({ src, left, setVideo }) => {
  const video_id = src.split("/")[4];
  const video_thumbnail_url = `https://img.youtube.com/vi/${video_id}/0.jpg`;
  // console.log(left);

  const [hover, setHover] = useState(false);

  const hoverActiveHandler = () => {
    setHover(!hover);
  };

  const playVideo = () => {
    console.log("play video");
    setVideo(src);
  };

  return (
    <>
      <Container
        left={left}
        onMouseEnter={hoverActiveHandler}
        onMouseLeave={hoverActiveHandler}
      >
        <ImgWrapper>
          <Img src={video_thumbnail_url} activeFlag={hover} alt={video_id} />
        </ImgWrapper>
        {hover && (
          <YoutubeIcon onClick={playVideo}>
            <FaYoutube />
          </YoutubeIcon>
        )}
      </Container>
    </>
  );
};

export default VideoCard;
