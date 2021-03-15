import React, { useState } from "react";
import RAP from "react-audio-player";
import { Container, InfoWrapper, Sound } from "./BookUtils.elements";

const BookUtils = ({ bookChangePage, cPag, tPag, pageReading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const changeState = () => {
    setCurrentPage(10);
  };

  let displayPages = "";
  if (bookChangePage > window.innerWidth) {
    displayPages = (
      <InfoWrapper>
        Página {cPag} de {tPag}
      </InfoWrapper>
    );
  } else {
    displayPages = (
      <InfoWrapper>
        Página {cPag + 1} de {tPag}
      </InfoWrapper>
    );
  }

  return (
    <Container>
      <InfoWrapper>{displayPages}</InfoWrapper>
      <Sound>
        <RAP src={pageReading.src} controls />
      </Sound>
    </Container>
  );
};

export default BookUtils;
