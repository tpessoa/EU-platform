import React, { useState, useEffect } from "react";
import { CategoryData } from "../../pages/Videos/Data";
import VideoCard from "../VideoCard";
import PlayVideo from "../PlayVideo";

import { Container, PlayerWrapper } from "./VideoGallery.elements";

const VideoGallery = ({ location }) => {
  const [videos_arr, setVideos_arr] = useState(null);
  const [video, setVideo] = useState(null);

  const getVideos = (id) => {
    CategoryData.forEach((element) => {
      if (element.id == id) {
        setVideos_arr(element.videos);
      }
    });
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    let id = null;
    id = urlParams.get("id");
    if (id) {
      getVideos(id);
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
              />
            );
          })}
      </Container>
      {video && (
        <PlayerWrapper>
          <PlayVideo video_url={video} />
        </PlayerWrapper>
      )}
    </>
  );
};

export default VideoGallery;
