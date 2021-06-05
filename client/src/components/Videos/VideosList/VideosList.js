import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

import VideoCard from "../VideoCard";
import Image from "../../UI/Image";

import {
  Container,
  VideosWrapper,
  InfoWrapper,
  Title,
  ImgWrapper,
  ScrollContainer,
  DisableArrow,
  Slide,
  VideoWrapper,
  BtnWrapper,
  ShowMore,
} from "./VideosList.elements";
import { Button } from "@material-ui/core";

const VideosList = (props) => {
  const { categoryData, categoryVideos } = props;
  const { title, thumbnail } = categoryData;

  const dir_r = -1,
    dir_l = 1;
  const [left, setLeft] = useState(-20);
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
      if (Math.abs(scrollCounter) < categoryVideos.length) {
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

  return (
    <>
      <Container>
        <InfoWrapper>
          <Title>
            <h1>{title}</h1>
          </Title>
          <ImgWrapper>
            <Image imgObj={thumbnail} />
          </ImgWrapper>
        </InfoWrapper>
        <ScrollContainer>
          <Slide>
            <DisableArrow disableArrow={disableArrowLeft}>
              <FaChevronLeft onClick={() => handleClick(dir_l)} />
            </DisableArrow>
          </Slide>
          <VideosWrapper>
            {categoryVideos.map((video, index) => (
              <VideoCard
                key={index}
                videoObj={video}
                left={left}
                gallery={false}
              />
            ))}
          </VideosWrapper>
          <Slide>
            <DisableArrow disableArrow={disableArrowRight}>
              <FaChevronRight onClick={() => handleClick(dir_r)} />
            </DisableArrow>
          </Slide>
        </ScrollContainer>
        <BtnWrapper>
          <Button
            style={{ color: "white" }}
            variant="contained"
            color="secondary"
            component={Link}
            to={{
              pathname: `/videos/category`,
              search: `?id=${categoryData._id}`,
            }}
          >
            Ver Todos
          </Button>
        </BtnWrapper>
      </Container>
    </>
  );
};

export default VideosList;
