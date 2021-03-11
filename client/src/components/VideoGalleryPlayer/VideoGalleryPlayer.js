import React, { useState, useEffect } from "react";

import PlayVideo from "../PlayVideo";
import { CategoryData } from "../../pages/Videos/Data";

import { PlayerWrapper } from "./VideoGalleryPlayer.elements";

const VideoGalleryPlayer = ({ location }) => {
  const [video, setVideo] = useState(null);

  const getVideoUrl = (c_id, v_id) => {
    var obj = CategoryData.find((element) => element.id == c_id);
    if (obj.videos) {
      return obj.videos.find((element) => element.includes(v_id));
    }
    return null;
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    let catId = null;
    let videoId = null;
    catId = urlParams.get("id");
    videoId = urlParams.get("video");
    if (catId && videoId) {
      setVideo(getVideoUrl(catId, videoId));
    }
  }, [location]);

  return (
    <>
      <PlayerWrapper>
        <PlayVideo video_url={video} />
      </PlayerWrapper>
    </>
  );
};

export default VideoGalleryPlayer;
