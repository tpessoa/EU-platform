import React from "react";

import { Container, GalleryWrapper } from "./PollGallery.elements";
import PollCard from "../PollCard";

const PollGallery = ({ pollList }) => {
  return (
    <>
      <Container>
        <GalleryWrapper>
          {pollList.map((card, index) => {
            return <PollCard card={card} key={index} />;
          })}
        </GalleryWrapper>
      </Container>
    </>
  );
};

export default PollGallery;
