import React, { useState } from "react";
import { Link as LinkScroll } from "react-scroll";
import { getVideoIDByURL } from "../../../globalFuncUtils";

import { FaYoutube } from "react-icons/fa";
import { Container, ImgWrapper, YoutubeIcon, Img } from "./VideoCard.elements";

const VideoCard = (props) => {
  const { videoObj, left, gallery } = props;
  const { src, url, category_id } = videoObj;
  const video_id = getVideoIDByURL(url);
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
          search: `?id=${category_id}&videoId=${video_id}`,
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
          search: `videoId=${video_id}`,
        }}
      >
        <FaYoutube />
      </YoutubeIcon>
    );
  }

  return (
    <LinkScroll
      to="scrollToFooter"
      smooth={true}
      delay={0}
      duration={2000}
      offset={-80}
    >
      {video_id && (
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
      )}
    </LinkScroll>
  );
};

export default VideoCard;
