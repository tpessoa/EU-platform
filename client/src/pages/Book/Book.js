import React from "react";

import FilpBook from "../../components/Book/FilpBook";
import PageFlip from "../../components/Book/PageFlip";

import { bookObjOne, bookObjTwo } from "./Data";

const Book = () => {
  // return <FilpBook book={bookObjTwo.book} soundClips={bookObjTwo.soundClips} />;
  return <PageFlip book={bookObjTwo.book} audio={bookObjTwo.soundClips} />;
  // return <FlipPage book={bookObjOne} />;
};

export default Book;
