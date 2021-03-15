import React from "react";

import PollGallery from "../../components/Poll/PollGallery/PollGallery";
import { pollObjOne } from "./Data";

const Poll = () => {
  return (
    <>
      <PollGallery pollList={pollObjOne} />
    </>
  );
};

export default Poll;
