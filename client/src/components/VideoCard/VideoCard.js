import React, { useState } from "react";

import { FaYoutube } from "react-icons/fa";
import { Container, ImgWrapper, YoutubeIcon, Img } from "./VideoCard.elements";

const VideoCard = ({ src, left, setVideo, category, gallery }) => {
  const video_id = src.split("/")[4];
  const video_thumbnail_url = `https://img.youtube.com/vi/${video_id}/0.jpg`;
  // console.log(left);

  const [hover, setHover] = useState(false);

  const hoverActiveHandler = () => {
    setHover(!hover);
  };

  const playVideo = () => {
    setVideo(src);
  };

  let typeOfPage;
  if (gallery) {
    typeOfPage = (
      <YoutubeIcon
        onClick={playVideo}
        to={{
          pathname: `/videos/category`,
          search: `?id=${category}&video=${video_id}`,
        }}
      >
        <FaYoutube />
      </YoutubeIcon>
    );
  } else {
    typeOfPage = (
      <YoutubeIcon
        onClick={playVideo}
        to={{
          pathname: `/videos`,
          search: `?id=${category}&video=${video_id}`,
        }}
      >
        <FaYoutube />
      </YoutubeIcon>
    );
  }

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
        {hover && typeOfPage}
      </Container>
    </>
  );
};

export default VideoCard;
