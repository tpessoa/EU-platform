import React, { useState, useEffect } from "react";

import ImageField from "../../ImageField";

const emptyColorGameAssets = {
  images: {
    colored_img: {
      id: "defaultImage",
      path: "",
      server_path: "",
    },
    blank_img: {
      id: "defaultImage",
      path: "",
      server_path: "",
    },
  },
};

const EditColorGame = (props) => {
  const { createGame, assets, setAssets } = props;
  const [loadedCompleted, setLoadedCompleted] = useState(false);

  useEffect(() => {
    if (createGame) {
      setAssets({ ...emptyColorGameAssets });
    }
    setLoadedCompleted(true);
  }, []);

  const imageHandler = (obj, ref) => {
    // console.log(obj);
    // console.log(ref);
    const tempAssets = { ...assets };
    tempAssets.images[ref] = obj;
    setAssets(tempAssets);
  };

  let display = "";
  if (loadedCompleted) {
    display = (
      <>
        <ImageField
          field_ref={"colored_img"}
          imageObj={assets.images.colored_img}
          parentChangeHandler={imageHandler}
        />
        <ImageField
          field_ref={"blank_img"}
          imageObj={assets.images.blank_img}
          parentChangeHandler={imageHandler}
        />
      </>
    );
  }

  return <>{display}</>;
};

export default EditColorGame;
