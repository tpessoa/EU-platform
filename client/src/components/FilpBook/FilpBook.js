import React from "react";
import HTMLFlipBook from "react-pageflip";

import { Container, BookWrapper, Page } from "./FilpBook.elements";

const FilpBook = () => {
  return (
    <Container>
      <BookWrapper>
        <HTMLFlipBook
          width={400}
          height={500}
          minWidth={200}
          minHeight={200}
          maxWidth={1000}
          maxHeight={1000}
          size="stretch"
        >
          <Page>
            <div className="demoPage">Page 1</div>
          </Page>
          <Page>
            <div className="demoPage">Page 2</div>
          </Page>
          <Page>
            <div className="demoPage">Page 3</div>
          </Page>
          <Page>
            <div className="demoPage">Page 4</div>
          </Page>
        </HTMLFlipBook>
      </BookWrapper>
    </Container>
  );
};

export default FilpBook;
