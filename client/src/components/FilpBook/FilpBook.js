import React, { useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import BookUtils from "../BookUtils";

import {
  Container,
  InfoWrapper,
  Title,
  Description,
  BookContainer,
  BookWrapper,
  Page,
  Img,
} from "./FilpBook.elements";

/*
single page
  width={400}
  height={300}
  minWidth={400}
  minHeight={200}
  maxWidth={1000}
  maxHeight={1000}
*/

const FilpBook = ({ book, soundClips }) => {
  console.log(soundClips);
  const bookWindowChange = 500;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(book.length);

  const onFlipHandler = (ev) => {
    setCurrentPage(ev.object.pages.currentPageIndex + 1);
  };

  return (
    <Container>
      <InfoWrapper>
        <Title>Livro</Title>
        <Description>descrição</Description>
      </InfoWrapper>
      <BookContainer>
        <BookUtils
          bookChangePage={bookWindowChange}
          cPag={currentPage}
          tPag={totalPages}
          pageReading={soundClips[0]}
        />
        <BookWrapper>
          <HTMLFlipBook
            width={400}
            height={500}
            minWidth={200}
            minHeight={200}
            maxWidth={1000}
            maxHeight={1000}
            size="stretch"
            mobileScrollSupport={true}
            onFlip={onFlipHandler}
          >
            {book.map((page, index) => {
              return (
                <Page key={index}>
                  {/* <h3>{page.title}</h3> */}
                  <Img src={page.img} alt={page.title} />
                </Page>
              );
            })}
          </HTMLFlipBook>
        </BookWrapper>
      </BookContainer>
    </Container>
  );
};

export default FilpBook;
