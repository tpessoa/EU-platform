import React, { useEffect } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import axios from "axios";

import Loading from "../../../UI/Loading";
import Error from "../../../UI/Error";

import SelectInput from "../../../Form/SelectInput";
import MenuItem from "@material-ui/core/MenuItem";

import { usePolls } from "../../../../hooks/usePolls";

const Categories = (props) => {
  const { setPoll } = props;
  const queryStringId = "getAllPollCategories";
  const polls = usePolls();

  if (polls.isLoading) return <Loading />;
  if (polls.isError) return <Error error={polls.error} />;

  const handleClick = (index) => {
    setPoll(polls.data[index]._id);
  };

  return (
    <SelectInput label="Categoria de votação">
      {polls.data &&
        polls.data.map((category, index) => (
          <MenuItem
            key={index}
            value={index}
            onClick={() => handleClick(index)}
          >
            {category.title}
          </MenuItem>
        ))}
    </SelectInput>
  );
};

export default Categories;
