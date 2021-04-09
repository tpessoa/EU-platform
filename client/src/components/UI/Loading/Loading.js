import React from "react";
import styled from "styled-components";

import CircularProgress from "@material-ui/core/CircularProgress";

const Loading = (props) => {
  const {} = props;
  return (
    <Container>
      <CircularProgress />
    </Container>
  );
};

export default Loading;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
