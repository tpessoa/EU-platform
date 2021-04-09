import React from "react";
import styled from "styled-components";

import ReactPlayer from "react-player/youtube";
// import ReactPlayer from "react-player/lazy";

const PlayVideo = ({ videoURL }) => {
  return (
    <Player>
      <ReactPlayerCustom url={videoURL} playing={true} controls={true} />
    </Player>
  );
};

export default PlayVideo;

export const PlayerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
`;

export const Player = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;
`;

export const ReactPlayerCustom = styled(ReactPlayer)`
  min-width: 885px;
  min-height: 500px;

  @media screen and (max-width: 960px) {
    min-width: 560px;
    min-height: 315px;
  }

  @media screen and (max-width: 640px) {
    min-width: 318px;
    min-height: 180px;
  }
`;
