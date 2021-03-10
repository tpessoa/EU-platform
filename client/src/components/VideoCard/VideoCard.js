import React from "react";

import { FaYoutube } from "react-icons/fa";
import {
  Container,
  VideoWrapper,
  ImgWrapper,
  YoutubeIcon,
  Img,
} from "./VideoCard.elements";

const VideoCard = ({ src, left }) => {
  const video_id = src.split("/")[4];
  const video_thumbnail_url = `https://img.youtube.com/vi/${video_id}/0.jpg`;
  console.log(left);
  return (
    <>
      <Container left={left}>
        <YoutubeIcon>
          <FaYoutube />
        </YoutubeIcon>
        <ImgWrapper>
          <Img src={video_thumbnail_url} />
        </ImgWrapper>
        {/* <VideoWrapper
          width="560"
          height="315"
          src={src}
          frameborder="0"
          allowfullscreen="true"
          referrerpolicy="same-origin"
        /> */}
      </Container>
    </>
  );
};

export default VideoCard;
