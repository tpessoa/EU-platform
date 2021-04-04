import React from "react";
import styled from "styled-components";

import Checkbox from "@material-ui/core/Checkbox";

const CheckboxField = (props) => {
  const { field_ref, description, value, setHandler } = props;
  const [checked, setChecked] = React.useState(value);

  const handleChange = (event) => {
    setChecked(event.target.checked);

    setHandler(event.target.checked, field_ref);
  };
  return (
    <Container>
      <CheckboxContainer>
        <CheckboxCustom
          checked={checked}
          onChange={handleChange}
          inputProps={{ "aria-label": "secondary checkbox" }}
        />
      </CheckboxContainer>
      <DescriptionContainer>{description}</DescriptionContainer>
    </Container>
  );
};

export default CheckboxField;

const CheckboxCustom = styled(Checkbox)`
  color: #2a5298 !important;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15%;
`;
const DescriptionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 50%;
`;
