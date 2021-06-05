import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import { getEmbedURL, getVideoIDByURL } from "../../../globalFuncUtils";

import VideosList from "../VideosList";
import PlayVideo from "../PlayVideo";
import { useVideo, useVideos } from "../../../hooks/useVideos";
import Loading from "../../UI/Loading";
import Error from "../../UI/Error";

const VideosGenerator = (props) => {
  const { categoriesData } = props;
  const allVideos = useVideos();

  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const videoYtId = query.get("videoId");
  const [selectedVideo, setSelectedVideo] = useState(videoYtId);

  useEffect(() => {
    setSelectedVideo(videoYtId);
  }, [videoYtId != null]);

  if (allVideos.isLoading) return <Loading />;
  if (allVideos.error) return <Error error={allVideos.error} />;

  let videoObj = null;
  if (selectedVideo) {
    for (const video of allVideos.data) {
      if (video.url.includes(videoYtId)) {
        videoObj = video;
      }
    }
  }

  return (
    <>
      {categoriesData.map((cat, index) => (
        <VideosList
          key={index}
          categoryData={cat.categoryData}
          categoryVideos={cat.categoryVideos}
        />
      ))}
      {videoObj && (
        <VideoWrapper>
          <PlayVideo videoURL={videoObj.url} />
        </VideoWrapper>
      )}
    </>
  );
};

export default VideosGenerator;

const VideoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
`;
