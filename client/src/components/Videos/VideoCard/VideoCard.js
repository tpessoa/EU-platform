import React, { useState } from "react";
import { Link as LinkScroll } from "react-scroll";
import { getVideoIDByURL } from "../../../globalFuncUtils";

import { FaYoutube } from "react-icons/fa";
import { Container, ImgWrapper, YoutubeIcon, Img } from "./VideoCard.elements";

const VideoCard = ({ src, left, category, gallery }) => {
  const video_id = getVideoIDByURL(src);
  const video_thumbnail_url = `https://img.youtube.com/vi/${video_id}/sddefault.jpg`;

  const [hover, setHover] = useState(false);

  const hoverActiveHandler = () => {
    setHover(!hover);
  };

  let typeOfPage;
  if (gallery) {
    typeOfPage = (
      <YoutubeIcon
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
        to={{
          pathname: `/videos`,
          search: `?catId=${category}&videoId=${video_id}`,
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
        offset={-200}
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
