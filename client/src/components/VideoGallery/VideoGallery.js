import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { CategoryData } from "../../pages/Videos/Data";

import VideoCard from "../VideoCard";
import VideoGalleryPlayer from "../VideoGalleryPlayer";

import {
  Container,
  InfoWrapper,
  Title,
  ImgWrapper,
  CategoryImg,
  VideosContainer,
  VideosWrapper,
} from "./VideoGallery.elements";

const VideoGallery = ({ location }) => {
  const [catData, setCatData] = useState(null);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    let id = null;
    let videoId = null;
    id = urlParams.get("id");
    if (id) {
      const currentCatData = CategoryData.find((element) => element.id == id);
      setCatData(currentCatData);

      // case of reloading the page, the video url is already there
      videoId = urlParams.get("video");
      if (videoId) {
        const videoObj = currentCatData.videos.find((element) =>
          element.includes(videoId)
        );
        setVideo(videoObj);
      }
    }
  }, []);

  let body = null;
  if (catData) {
    body = (
      <InfoWrapper>
        <Title>{catData.title}</Title>
        <ImgWrapper>
          <CategoryImg src={catData.img} alt={`img_${catData.title}`} />
        </ImgWrapper>
      </InfoWrapper>
    );
  }

  return (
    <>
      <Container>
        {body}
        <VideosContainer>
          <VideosWrapper>
            {catData &&
              catData.videos.map((video, index) => {
                return (
                  <VideoCard
                    src={video}
                    key={index}
                    left={false}
                    setVideo={setVideo}
                    category={catData.id}
                    gallery={true}
                  />
                );
              })}
          </VideosWrapper>
        </VideosContainer>
        {video && (
          <Route exact path="/videos/category" component={VideoGalleryPlayer} />
        )}
      </Container>
    </>
  );
};

export default VideoGallery;
