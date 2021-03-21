import React, { useState } from "react";
import { Link as LinkScroll } from "react-scroll";

import { FaYoutube } from "react-icons/fa";
import { Container, ImgWrapper, YoutubeIcon, Img } from "./VideoCard.elements";

const VideoCard = ({ src, left, setVideo, category, gallery }) => {
  const video_id = src.split("/")[4];
  const video_thumbnail_url = `https://img.youtube.com/vi/${video_id}/0.jpg`;

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
      <LinkScroll
        to={"scrollToVideoPlayer_" + category}
        smooth={true}
        delay={500}
        duration={1000}
        offset={-280}
      >
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
      </LinkScroll>
    </>
  );
};

export default VideoCard;
