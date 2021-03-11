import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import VideoCard from "../VideoCard";
import VideosListPlayer from "../VideosListPlayer/";
import PlayVideo from "../PlayVideo";

import {
  Container,
  VideosWrapper,
  InfoWrapper,
  Title,
  ImgWrapper,
  Img,
  Slide,
  VideoWrapper,
  BtnWrapper,
  ShowMore,
} from "./VideosList.elements";

const VideosList = ({ id, title, img, reverse, videos }) => {
  const location = useLocation();
  const [left, setLeft] = useState(0);
  const [video, setVideo] = useState(null);

  const handleClick = () => {
    let temp = left;
    temp -= 20;
    setLeft(temp);
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
                category={id}
                gallery={false}
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
        // TO DO (when F5 display the video that is in Query)
        // <Route exact path="/videos/:videoId" component={VideosListPlayer} />
        <VideoWrapper>
          <PlayVideo video_url={video} />
        </VideoWrapper>
      )}
    </>
  );
};

export default VideosList;
