import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import {
  Container,
  GalleryWrapper,
  PaginationWrapper,
} from "./PollGallery.elements";
import PollCard from "../PollCard";

import "./pagination.css";

const PollGallery = ({ pollList }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [worksPerPage, setWorksPerPage] = useState(3);

  const currWorkListPos = pageNumber * worksPerPage;

  const displayListOfWorks = pollList
    .slice(currWorkListPos, currWorkListPos + worksPerPage)
    .map((card, index) => {
      return <PollCard card={card} key={index} />;
    });

  const pageCount = Math.ceil(pollList.length / worksPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      <Container>
        <GalleryWrapper>{displayListOfWorks}</GalleryWrapper>
        <PaginationWrapper>
          <ReactPaginate
            pageCount={pageCount}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            previousLabel={"Anterior"}
            nextLabel={"Seguinte"}
            onPageChange={changePage}
            containerClassName={"pagContainer"}
            containerClassName={"pagBtns"}
            disabledClassName={"pagDisable"}
            activeClassName={"pagActive"}
          />
        </PaginationWrapper>
      </Container>
    </>
  );
};

export default PollGallery;
