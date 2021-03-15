import React, { useState, useEffect } from "react";

import FlipPage from "react-flip-page";

import {
  Container,
  BookWrapper,
  SinglePage,
  DualPage,
  PageTitle,
  PageLeft,
  PageRight,
  UtilsWrapper,
} from "./Book.elements";

const convertBookContent = (obj) => {
  let newObj = [];
  obj.forEach((element) => {
    newObj.push({
      title: element.title,
      content: element.leftContent,
    });

    newObj.push({
      title: element.title,
      content: element.rightContent,
    });
  });
  return newObj;
};

const Book = ({ book }) => {
  const mobileScreenWidth = 960;
  const [screenMobile, setScreenMobile] = useState(null);
  const [screenDesktop, setScreenDesktop] = useState(null);
  const [bookMobile, setbookMobile] = useState(null);
  const [bookDesktop, setbookDesktop] = useState(null);

  useEffect(() => {
    setbookDesktop(book);
    setbookMobile(convertBookContent(book));

    if (window.innerWidth < mobileScreenWidth) {
      setScreenDesktop(false);
    } else {
      setScreenDesktop(true);
    }
  }, []);

  useEffect(() => {
    if (screenMobile) {
      console.log("converting to mobile");
      setScreenDesktop(false);
    } else {
      console.log("converting to desktop");
      setScreenDesktop(true);
    }
  }, [screenMobile]);

  const mobileScreenHandler = () => {
    if (window.innerWidth < mobileScreenWidth && !screenMobile) {
      setScreenMobile(true);
    } else if (window.innerWidth >= mobileScreenWidth && screenMobile) {
      setScreenMobile(false);
    }
  };

  window.addEventListener("resize", mobileScreenHandler);
  // console.log("--> " + screenMobile);
  let displayDesktopBook, displayMobileBook;
  if (bookMobile) {
    displayMobileBook = bookMobile.map((page, index) => {
      return (
        <article key={index}>
          <PageTitle>{page.title}</PageTitle>
          <SinglePage>{page.content}</SinglePage>
        </article>
      );
    });
  }
  displayDesktopBook = book.map((page, index) => {
    return (
      <article key={index}>
        <PageTitle>{page.title}</PageTitle>
        <DualPage>
          <PageLeft>{page.leftContent}</PageLeft>
          <PageRight>{page.rightContent}</PageRight>
        </DualPage>
      </article>
    );
  });

  return (
    <>
      <Container>
        <BookWrapper>
          <FlipPage
            orientation="horizontal"
            animationDuration={300}
            responsive={true}
            pageBackground="blue"
            // showSwipeHint={true}

            disableSwipe={true}
            flipOnTouch={true}
            showTouchHint={true}
          >
            {screenDesktop != null && screenDesktop
              ? displayDesktopBook
              : displayMobileBook}
          </FlipPage>
        </BookWrapper>
      </Container>
      <UtilsWrapper>
        <button>Virar Páginas</button>
      </UtilsWrapper>
    </>
  );
};

export default Book;