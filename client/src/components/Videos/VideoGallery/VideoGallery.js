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
  ImgWrapper,
  CategoryImg,
  VideosContainer,
  VideosWrapper,
} from "./VideoGallery.elements";
import PlayVideo from "../PlayVideo";

const VideoGallery = ({ props }) => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const catId = query.get("id");
  const videoId = query.get("videoId");

  const [playVideo, setPlayVideo] = useState(null);

  const {
    isLoading: isLoadingVideos,
    error: errorVideos,
    data: dataVideos,
  } = useQuery("videos", () => axios(`/api/videos/${catId}`));
  const {
    isLoading: isLoadingCat,
    error: errorCat,
    data: dataCat,
  } = useQuery("category", () => axios(`/api/videos/categories/${catId}`));

  if (isLoadingVideos || isLoadingCat) return <Loading />;
  if (errorVideos || errorCat) return <Error error={errorCat} />;

  return (
    <>
      <InfoWrapper>
        <Title>{dataCat.data.title}</Title>
        <ImgWrapper>
          <Image imgObj={dataCat.data.thumbnail} />
        </ImgWrapper>
      </InfoWrapper>
      <VideosContainer>
        <VideosWrapper>
          {dataVideos.data.map((video, index) => {
            return (
              <VideoCard
                key={index}
                src={video.url}
                left={false}
                category={video.category_id}
                gallery={true}
                setVideo={setPlayVideo}
              />
            );
          })}
        </VideosWrapper>
      </VideosContainer>
      {playVideo && <PlayVideo videoURL={playVideo} />}
      <div id={"scrollToVideoPlayer_" + catId}></div>
    </>
  );
};

export default VideoGallery;
