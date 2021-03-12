import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
  ScrollContainer,
  DisableArrow,
  Slide,
  VideoWrapper,
  BtnWrapper,
  ShowMore,
} from "./VideosList.elements";

const VideosList = ({ id, title, img, reverse, videos }) => {
  const dir_r = -1,
    dir_l = 1;
  const location = useLocation();
  const [left, setLeft] = useState(-20);
  const [video, setVideo] = useState(null);
  const [scrollCounter, setScrollCounter] = useState(0);

  const [disableArrowLeft, setDisableArrowLeft] = useState(false);
  const [disableArrowRight, setDisableArrowRight] = useState(false);

  const handleClick = (direction) => {
    let flagAllowScroll = false;

    if (direction == 1) {
      if (Math.abs(scrollCounter) > 0) {
        flagAllowScroll = true;
        setDisableArrowLeft(false);
      } else {
        setDisableArrowLeft(true);
      }
      setDisableArrowRight(false);
    } else {
      if (Math.abs(scrollCounter) < videos.length) {
        flagAllowScroll = true;
        setDisableArrowRight(false);
      } else {
        setDisableArrowRight(true);
      }
      setDisableArrowLeft(false);
    }
    if (flagAllowScroll) {
      setScrollCounter(scrollCounter + direction);
      let temp = left;
      temp = temp + direction * 200;
      setLeft(temp);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    let videoId = null;
    videoId = urlParams.get("video");
    const video_url = videos.find((element) => element.includes(videoId));
    if (video_url) {
      setVideo(video_url);
    }
  }, []);
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
        <ScrollContainer>
          <Slide>
            {reverse ? (
              <DisableArrow disableArrow={disableArrowRight}>
                <FaChevronRight onClick={() => handleClick(dir_r)} />
              </DisableArrow>
            ) : (
              <DisableArrow disableArrow={disableArrowLeft}>
                <FaChevronLeft onClick={() => handleClick(dir_l)} />
              </DisableArrow>
            )}
          </Slide>
          <VideosWrapper reverse={reverse}>
            {videos.map((video, index) => {
              return (
                <VideoCard
                  src={video}
                  key={index}
                  left={left}
                  setVideo={setVideo}
                  category={id}
                  gallery={false}
                />
              );
            })}
          </VideosWrapper>
          <Slide>
            {reverse ? (
              <DisableArrow disableArrow={disableArrowLeft}>
                <FaChevronLeft onClick={() => handleClick(dir_l)} />
              </DisableArrow>
            ) : (
              <DisableArrow disableArrow={disableArrowRight}>
                <FaChevronRight onClick={() => handleClick(dir_r)} />
              </DisableArrow>
            )}
          </Slide>
        </ScrollContainer>
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
