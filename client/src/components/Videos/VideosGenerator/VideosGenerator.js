import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import { getEmbedURL, getVideoIDByURL } from "../../../globalFuncUtils";

import VideosList from "../VideosList";

const VideosGenerator = (props) => {
  const { categoriesData } = props;
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const catId = query.get("catId");
  const videoId = query.get("videoId");

  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    setSelectedVideo({ catId: catId, videoId: videoId });
  }, [catId && videoId]);

  return (
    <>
      {categoriesData.map((cat, index) => {
        let videoPlayInfo = null;
        if (selectedVideo && selectedVideo.catId === cat.categoryData._id) {
          videoPlayInfo = cat.categoryVideos.find(
            (video) => getVideoIDByURL(video.url) === selectedVideo.videoId
          );
        }

        return (
          // <div id={"scrollToVideoCategory_" + cat.categoryData._id}>
          <VideosList
            key={index}
            categoryData={cat.categoryData}
            categoryVideos={cat.categoryVideos}
            // reverse={index % 2 !== 0}
            reverse={false}
            playVideo={videoPlayInfo}
            scrollCatId={index}
            // nextCategoryScrollId
          />
          // </div>
        );
      })}
    </>
  );
};

export default VideosGenerator;
