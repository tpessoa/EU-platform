import React from "react";
import VideoCard from "../VideoCard";
import { Container, VideosWrapper, Title } from "./VideosList.elements";

const VideosList = ({ title, lightBg }) => {
  console.log(title);
  return (
    <>
      <Container lightBg={lightBg}>
        <Title>
          <h1>{title[0]}</h1>
        </Title>
        <VideosWrapper>
          <VideoCard />
          <VideoCard />
          <VideoCard />
          <VideoCard />
          <VideoCard />
          <VideoCard />
        </VideosWrapper>
      </Container>
    </>
  );
};

export default VideosList;
