import React from "react";
import styled from "styled-components";

const ContryDetails = (props) => {
  const { country } = props;
  return <Container>{country}</Container>;
};

export default ContryDetails;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d01d1d;
`;
