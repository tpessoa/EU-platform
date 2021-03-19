import React from "react";
import useForm from "../../../hooks/useForm";
import validate from "../../../validators/validateInfoPoll";

import {
  FormWrapper,
  Form,
  FormInputs,
  Input,
  Label,
  FormInputBtn,
} from "./PollForm.elements";

const PollForm = ({ submitForm }) => {
  const { handleChange, values, handleSubmit, errors } = useForm(
    submitForm,
    validate
  );

  return (
    <Form onSubmit={handleSubmit}>
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
          type="text"
          name="email"
          placeholder="Insere o teu email"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && <p>{errors.email}</p>}
      </FormInputs>
      <FormInputBtn type="submit">Confirmar</FormInputBtn>
    </Form>
  );
};

export default PollForm;
