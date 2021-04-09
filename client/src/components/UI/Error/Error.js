import React from "react";
import styled from "styled-components";

const Error = (props) => {
  const { error } = props;
  return (
    <Container>
      <h1>Erro, {error.message}</h1>
    </Container>
  );
};

export default Error;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
