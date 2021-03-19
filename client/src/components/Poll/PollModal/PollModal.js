import React, { useState } from "react";
import Form from "../PollForm";
import FormSuccess from "../PollFormSuccess";

import {
  Container,
  ContainerWrapper,
  ImgWrapper,
  InfoWrapper,
  Img,
  LeftContent,
  RightContent,
} from "./PollModal.elements";
// import Button from "@material-ui/core/Button";
import Button from "../../UI/Btn1";

const PollModal = ({ card }) => {
  const [aditionalInfo, setAditionalInfo] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const submitForm = () => {
    setIsSubmitted(true);
  };

  const performVoteHandler = () => {
    // call vote function from parent
  };

  const info = (
    <>
      <p>Carrega para votares</p>
      <Button onClick={performVoteHandler()}>Votar</Button>
    </>
  );

  const showAddInfo = () => {
    if (window.innerWidth < 960) {
      setAditionalInfo(true);
    } else {
      setAditionalInfo(false);
    }
  };

  window.addEventListener("resize", showAddInfo);

  return (
    <Container>
      <LeftContent>
        <ContainerWrapper>
          <InfoWrapper>
            {aditionalInfo ? info : ""}
            <h3>Título: {card.title}</h3>
            <ImgWrapper>
              <Img src={card.img} alt={"img_" + card.id} />
            </ImgWrapper>
            <p>Autor: {card.author}</p>
            <p>Descrição: {card.description}</p>
            <p>Número de votos: {card.votes}</p>
          </InfoWrapper>
        </ContainerWrapper>
      </LeftContent>
      <RightContent>
        <ContainerWrapper>
          {!isSubmitted ? <Form submitForm={submitForm} /> : <FormSuccess />}
        </ContainerWrapper>
      </RightContent>
    </Container>
  );
};

export default PollModal;
