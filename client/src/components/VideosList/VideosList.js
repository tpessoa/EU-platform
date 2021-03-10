import React, { useState } from "react";
import VideoCard from "../VideoCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  Container,
  VideosWrapper,
  InfoWrapper,
  Title,
  ImgWrapper,
  Img,
  Slide,
  ShowMore,
} from "./VideosList.elements";

const VideosList = ({ title, img, reverse, videos }) => {
  const [left, setLeft] = useState(0);

  const handleClick = () => {
    let temp = left;
    temp -= 20;
    setLeft(temp);
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
            return <VideoCard src={video} key={index} left={left} />;
          })}
          {/* <FaChevronRight /> */}
        </VideosWrapper>
        <ShowMore>Ver Todos</ShowMore>
      </Container>
    </>
  );
};

export default VideosList;
