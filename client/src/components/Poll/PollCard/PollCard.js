import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import Modal from "react-modal";
import PollModal from "../PollModal";

import "./modal.css";

import {
  Container,
  CardWrapper,
  Card,
  CardTopInfo,
  CardBottomInfo,
  Author,
  Votes,
  VoteIcon,
} from "./PollCard.elements";

const customStyles = {
  content: {},
};
Modal.setAppElement(document.getElementById("root"));

const PollCard = ({ card }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [updateCard, setUpdateCard] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const afterOpenModal = () => {
    console.log("open");
  };

  const voteHandler = () => {
    console.log("vote evaluation");
    // verify inputs inserted
    // spinner
    // display success or failure
    card.votes = 1000;
    // close modal
    setIsOpen(false);
  };

  return (
    <Container>
      <CardWrapper onClick={openModal}>
        <Card src={card.img} />
        <CardTopInfo>{card.title}</CardTopInfo>
        <CardBottomInfo>
          <Author>{card.author}</Author>
          <Votes>
            <p>{card.votes}</p>
            <VoteIcon>
              <FaStar />
            </VoteIcon>
          </Votes>
        </CardBottomInfo>
      </CardWrapper>
      <Modal
        isOpen={isOpen}
        closeTimeoutMS={500}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="overlay"
        id="FORM_MODAL"
      >
        <PollModal card={card} />
      </Modal>
    </Container>
  );
};

export default PollCard;
