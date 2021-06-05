import React, { useState, useEffect } from "react";
import { Route, useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";

import Loading from "../../UI/Loading";
import Error from "../../UI/Error";
import Image from "../../UI/Image";
import VideoCard from "../VideoCard";

import {
  Container,
  InfoWrapper,
  Title,
  Description,
  ImgWrapper,
  CategoryImg,
  VideosContainer,
  VideosWrapper,
} from "./VideoGallery.elements";
import PlayVideo from "../PlayVideo";
import { useCategory, useCategoryVideos } from "../../../hooks/useVideos";

const VideoGallery = ({ props }) => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const catId = query.get("id");
  const videoYtId = query.get("videoId");

  const [playVideo, setPlayVideo] = useState(null);

  useEffect(() => {
    setPlayVideo(videoYtId);
  }, [videoYtId]);

  const categoryInfo = useCategory(catId, true);
  const videosInCat = useCategoryVideos(catId, true);

  if (categoryInfo.isLoading || videosInCat.isLoading) return <Loading />;
  if (categoryInfo.isError || videosInCat.isError)
    return <Error error={categoryInfo.error} />;

  let videoObj = null;
  if (playVideo) {
    for (const video of videosInCat.data) {
      if (video.url.includes(videoYtId)) {
        videoObj = video;
      }
    }
  }

  return (
    <>
      <InfoWrapper>
        <Title>{categoryInfo.data.title}</Title>
        <Description>{categoryInfo.data.description}</Description>
        <ImgWrapper>
          <Image imgObj={categoryInfo.data.thumbnail} />
        </ImgWrapper>
      </InfoWrapper>
      <VideosContainer>
        <VideosWrapper>
          {videosInCat.data.map((video, index) => {
            return (
              <VideoCard
                key={index}
                videoObj={video}
                left={false}
                gallery={true}
              />
            );
          })}
        </VideosWrapper>
      </VideosContainer>
      {videoObj && <PlayVideo videoURL={videoObj.url} />}
    </>
  );
};

export default VideoGallery;
