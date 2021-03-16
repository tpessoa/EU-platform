import React from "react";

import FilpBook from "../../components/Book/FilpBook";

import { bookObjOne, bookObjTwo } from "./Data";

const Book = () => {
  console.log("euu");
  return <FilpBook book={bookObjTwo.book} soundClips={bookObjTwo.soundClips} />;
  // return <FlipPage book={bookObjOne} />;
};

export default Book;
