import React, { useState } from "react";
import RAP from "react-audio-player";
import { Container, InfoWrapper, Sound } from "./BookUtils.elements";

const BookUtils = ({ cPag, tPag, pageReading }) => {
  return (
    <Container>
      <InfoWrapper>
        Página {cPag} de {tPag}
      </InfoWrapper>
      <Sound>
        <RAP src={pageReading.src} controls />
      </Sound>
    </Container>
  );
};

export default BookUtils;
