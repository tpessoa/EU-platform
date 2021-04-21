import React, { useEffect, useState } from "react";
import styled from "styled-components";

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const SwitchField = (props) => {
  const { field_ref, label, value, switchHandler } = props;
  const [state, setState] = useState(false);

  useEffect(() => {
    setState(value);
  }, []);

  const handleChange = () => {
    const newState = !state;
    setState(newState);
    switchHandler(newState, field_ref);
  };

  return (
    <Container>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch checked={state} onChange={handleChange} color="primary" />
          }
          label={label}
        />
      </FormGroup>
    </Container>
  );
};

export default SwitchField;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem;
`;
