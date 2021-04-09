import React, { useState, useEffect } from "react";
import FlipPage from "react-flip-page";
import styled from "styled-components";
import Image from "../../UI/Image";
import BookUtils from "../BookUtils";

const PageFlip = (props) => {
  const { book, audio } = props;

  const [bookWidth, setBookWidth] = useState(window.innerWidth * 0.7);
  const [bookHeight, setBookHeight] = useState(window.innerHeight * 0.8);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(book.length);

  const bookResize = () => {
    if (window.innerWidth < 900) {
      const newWidth = window.innerWidth * 0.9;
      if (bookWidth != newWidth) {
        setBookWidth(newWidth);
      }
    } else if (window.innerWidth < 600) {
      const newWidth = window.innerWidth * 0.95;
      if (bookWidth != newWidth) {
        setBookWidth(newWidth);
      }
    }
  };

  window.addEventListener("resize", bookResize);

  const pageChangeHandler = (pageIndex) => {
    setCurrentPage(++pageIndex);
  };

  return (
    <Container>
      <InfoWrapper>
        <Title>Livro</Title>
        <Description>descrição</Description>
      </InfoWrapper>
      <BookContainer>
        <FlipPage
          orientation={"horizontal"}
          uncutPages={true}
          pageBackground={"#c9c9c9"}
          showSwipeHint
          animationDuration={500}
          width={bookWidth}
          heigth={bookHeight}
          onPageChange={pageChangeHandler}
        >
          {book.map((page, index) => {
            return (
              <article key={index}>
                <ImgWrapper w={bookWidth} h={bookHeight}>
                  <Img src={page.img} />
                </ImgWrapper>
              </article>
            );
          })}
        </FlipPage>
        <BookUtils
          cPag={currentPage}
          tPag={totalPages}
          pageReading={audio[0]}
        />
      </BookContainer>
    </Container>
  );
};

export default PageFlip;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  min-height: 60vh;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BookContainer = styled.div``;

const ImgWrapper = styled.div`
  width: ${(props) => `${props.w}px`};
  height: ${(props) => `${props.h}px`};
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;

const Title = styled.h1`
  text-align: center;
`;
const Description = styled.h3`
  text-align: center;
`;
