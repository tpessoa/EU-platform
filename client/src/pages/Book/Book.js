import React from "react";

import FilpBook from "../../components/FilpBook";
import FlipPage from "../../components/Book";

import { bookObjOne, bookObjTwo } from "./Data";

const Book = () => {
  console.log("euu");
  return <FilpBook book={bookObjTwo.book} soundClips={bookObjTwo.soundClips} />;
  // return <FlipPage book={bookObjOne} />;
};

export default Book;
