import React from "react";

import PageFlip from "../../components/Book/PageFlip";

import { bookData } from "./Data";

const Book = () => {
  return <PageFlip book={bookData.book} audio={bookData.soundClips} />;
};

export default Book;
