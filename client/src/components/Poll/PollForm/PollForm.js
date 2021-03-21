import React, { useState, useEffect, createRef } from "react";
import useForm from "../../../hooks/useForm";
import validate from "../../../validators/validateInfoPoll";

import {
  Form,
  FormInputs,
  Input,
  Label,
  FormInputBtn,
  Vote,
} from "./PollForm.elements";

const PollForm = ({ submitForm, scroll, setScroll }) => {
  const [scrollDiv, setScrollDiv] = useState(null);
  useEffect(() => {
    setScrollDiv(createRef());
  }, []);

  const { handleChange, values, handleSubmit, errors } = useForm(
    submitForm,
    validate
  );

  const scrollSmoothHandler = () => {
    scrollDiv.current.scrollIntoView({ behavior: "smooth" });
    setScroll(false);
  };
  return (
    <>
      {scroll ? scrollSmoothHandler() : null}
      <Form onSubmit={handleSubmit} id="scrollToForm">
        <Vote>Preenche os campos para votares neste trabalho</Vote>
        <FormInputs>
          <Label htmlFor="username">Nome</Label>
          <Input
            id="username"
            type="text"
            name="username"
            placeholder="Insere o teu nome"
            value={values.username}
            onChange={handleChange}
          />
          {errors.username && <p>{errors.username}</p>}
        </FormInputs>
        <FormInputs>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Insere o teu email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </FormInputs>
        <FormInputBtn ref={scrollDiv} type="submit">
          Confirmar
        </FormInputBtn>
      </Form>
    </>
  );
};

export default PollForm;
