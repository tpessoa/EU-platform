import React from "react";
import { useCategories } from "../../../../hooks/useVideos";
import SelectInput from "../../../Form/SelectInput";
import MenuItem from "@material-ui/core/MenuItem";
import Error from "../../../UI/Error";
import Loading from "../../../UI/Loading";

const Categories = (props) => {
  const { setCategory } = props;
  const categories = useCategories();
  const queryName = "video-categories";

  const handleClick = (index) => {
    setCategory(categories.data[index]._id);
  };

  if (categories.isLoading) {
    return <Loading />;
  }
  if (categories.isError) {
    return <Error error={categories.error} />;
  }
  return (
    <SelectInput label="Categorias de vídeos">
      {categories.data &&
        categories.data.map((category, index) => (
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
