import React, { useState, useEffect } from "react";
import FlipPage from "react-flip-page";
import styled from "styled-components";
import Image from "../../UI/Image";
import BookUtils from "../BookUtils";

const PageFlip = (props) => {
  const { book, audio } = props;

  let w, h;
  if (window.innerWidth < 1000) {
    w = window.innerWidth * 0.9;
    h = window.innerHeight * 0.5;
  } else if (window.innerWidth < 600) {
    w = window.innerWidth * 0.95;
    h = window.innerHeight * 0.8;
  } else {
    w = window.innerWidth * 0.6;
    h = window.innerHeight * 0.6;
  }

  const [bookWidth, setBookWidth] = useState(w);
  const [bookHeight, setBookHeight] = useState(h);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(book.length);

  // const bookResize = () => {
  //   if (window.innerWidth < 1000) {
  //     const newWidth = window.innerWidth * 0.9;
  //     const newHeight = window.innerHeight * 0.3;
  //     if (bookWidth != newWidth) {
  //       setBookWidth(newWidth);
  //       setBookHeight(newHeight);
  //     }
  //   } else if (window.innerWidth < 600) {
  //     const newWidth = window.innerWidth * 0.95;
  //     const newHeight = window.innerHeight * 0.4;
  //     if (bookWidth != newWidth) {
  //       setBookWidth(newWidth);
  //       setBookHeight(newHeight);
  //     }
  //   }
  // };

  // window.addEventListener("resize", bookResize);

  const pageChangeHandler = (pageIndex) => {
    setCurrentPage(++pageIndex);
  };

  return (
    <Container>
      <InfoWrapper>
        <Title>Livro Infantil</Title>
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
  flex-direction: column;
  width: 100%;
  min-height: 80vh;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BookContainer = styled.div`
  height: 60vh;
`;

const ImgWrapper = styled.div`
  width: ${(props) => `${props.w}px`};
  height: ${(props) => `${props.h}px`};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Img = styled.img`
  height: 100%;
  width: 100%;
`;

const Title = styled.h1`
  text-align: center;
  margin: 2rem;
`;
const Description = styled.h3`
  text-align: center;
  margin: 1rem;
`;
