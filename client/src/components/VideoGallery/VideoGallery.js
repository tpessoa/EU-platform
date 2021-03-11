import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";

import { CategoryData } from "../../pages/Videos/Data";
import VideoCard from "../VideoCard";

import { Container } from "./VideoGallery.elements";
import VideoGalleryPlayer from "../VideoGalleryPlayer";

const VideoGallery = ({ location }) => {
  const [category, setCategory] = useState(null);
  const [videos_arr, setVideos_arr] = useState(null);
  const [video, setVideo] = useState(null);

  // case of reloading page to display the again
  const getVideoUrl = (c_id, v_id) => {
    var obj = CategoryData.find((element) => element.id == c_id);
    if (obj.videos) {
      return obj.videos.find((element) => element.includes(v_id));
    }
    return null;
  };

  const getVideos = (id) => {
    CategoryData.forEach((element) => {
      if (element.id == id) {
        setCategory(id);
        setVideos_arr(element.videos);
      }
    });
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    let id = null;
    let videoId = null;
    id = urlParams.get("id");
    if (id) {
      getVideos(id);

      // case of reloading the page, the video url is already there
      videoId = urlParams.get("video");
      if (videoId) {
        setVideo(getVideoUrl(id, videoId));
      }
    }
  }, []);

  return (
    <>
      <Container>
        {videos_arr &&
          videos_arr.map((video, index) => {
            return (
              <VideoCard
                src={video}
                key={index}
                left={false}
                setVideo={setVideo}
                category={category}
                gallery={true}
              />
            );
          })}
      </Container>
      {video && (
        <Route exact path="/videos/category" component={VideoGalleryPlayer} />
      )}
    </>
  );
};

export default VideoGallery;
