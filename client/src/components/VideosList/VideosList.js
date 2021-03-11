import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import VideoCard from "../VideoCard";
import PlayVideo from "../PlayVideo";

import {
  Container,
  VideosWrapper,
  InfoWrapper,
  Title,
  ImgWrapper,
  Img,
  Slide,
  BtnWrapper,
  ShowMore,
  VideoWrapper,
} from "./VideosList.elements";

const VideosList = ({ id, title, img, reverse, videos }) => {
  const [left, setLeft] = useState(0);
  const [video, setVideo] = useState(null);

  const handleClick = () => {
    let temp = left;
    temp -= 20;
    setLeft(temp);
  };

  const showMoreVideos = () => {
    console.log("More videos");
  };

  return (
    <>
      <Container lightBg={reverse} reverse={reverse}>
        <InfoWrapper>
          <Title>
            <h1>{title}</h1>
          </Title>
          <ImgWrapper>
            <Img src={img} alt={"image_" + title}></Img>
          </ImgWrapper>
        </InfoWrapper>
        <VideosWrapper>
          {/* <Slide>
            <FaChevronLeft onClick={handleClick} />
          </Slide> */}
          {videos.map((video, index) => {
            return (
              <VideoCard
                src={video}
                key={index}
                left={left}
                setVideo={setVideo}
              />
            );
          })}
          {/* <FaChevronRight /> */}
        </VideosWrapper>
        <BtnWrapper>
          <ShowMore
            to={{
              pathname: `/videos/category`,
              search: `?id=${id}`,
            }}
          >
            Ver Todos
          </ShowMore>
        </BtnWrapper>
      </Container>
      {video && (
        <VideoWrapper>
          <PlayVideo video_url={video} />
        </VideoWrapper>
      )}
    </>
  );
};

export default VideosList;
