import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Switch from "../../../../Input/Switch";
import NumberField from "../../../../Input/NumberField";
import ListField from "../../../../Input/ListField/ListFieldNewNew";
import ImageField from "../../../ImageField";

const imageSlotsHandler = (arr, obj) => {
  const tempArr = [...arr];
  // add slots
  if (tempArr.length < obj) {
    const slots = obj - tempArr.length;
    for (let i = 0; i < slots; i++) {
      tempArr.push({ ...emptyImageObj });
    }
  }

  // remove slots
  else {
    const slots = tempArr.length - obj;
    for (let i = 0; i < slots; i++) {
      tempArr.pop();
    }
  }

  return tempArr;
};
const total_images_arr = [3, 6, 8, 10];

const emptyMemoryConfig = {
  destroy_card: false,
  time_to_complete: null,
  max_attempts: null,
  total_images: 0,
};

const emptyImageObj = {
  id: "defaultImage",
  path: "",
  server_path: "",
};

const emptyMemoryAssets = {
  images: {
    back_card: emptyImageObj,
    front_cards: imageSlotsHandler(
      [],
      total_images_arr[emptyMemoryConfig.total_images]
    ),
  },
};

const EditMemory = (props) => {
  const {
    createGame,
    config,
    assets,
    setConfig,
    setAssets,
    configTitle,
    assetsTitle,
  } = props;

  const [loadedCompleted, setLoadedCompleted] = useState(false);
  const [switchers, setSwitchers] = useState({
    time_to_complete: true,
    max_attempts: null,
  });

  useEffect(() => {
    if (createGame) {
      setConfig({ ...emptyMemoryConfig });
      setAssets({ ...emptyMemoryAssets });
    }
    setLoadedCompleted(true);
  }, []);

  const textHandler = (userInput, ref) => {
    // console.log(ev.target.value);
    // console.log(ref);
    const tempConfig = { ...config };
    tempConfig[ref] = parseInt(userInput);
    setConfig(tempConfig);
  };

  const imageHandler = (obj, ref) => {
    console.log(obj);
    console.log(ref);

    const tempAssets = { ...assets };
    if (ref === "back_card") {
      tempAssets.images[ref] = obj;
    } else {
      const splited = ref.split("_");
      const cardIndex = splited.pop();
      const joined = splited.join("_");
      console.log(tempAssets.images);
      console.log(joined);
      tempAssets.images[joined][cardIndex] = obj;
    }
    setAssets(tempAssets);
  };

  const changeHandler = (obj, ref) => {
    // console.log(obj);
    // console.log(ref);
    const tempConfig = { ...config };

    // populate assets with images slots
    if (ref === "total_images") {
      const tempAssets = { ...assets };
      tempAssets.images.front_cards = imageSlotsHandler(
        tempAssets.images.front_cards,
        obj
      );
    }
    if (ref === "time_to_complete" || ref === "max_attempts") {
      tempConfig[ref] = parseInt(obj);
    } else {
      tempConfig[ref] = obj;
    }

    setConfig(tempConfig);
  };

  const switcherHandler = (obj, ref) => {
    const splited = ref.split("_");
    splited.pop();
    const joined = splited.join("_");
    // console.log(joined);

    // if is desactivated
    const tempConfig = { ...config };
    if (!obj) {
      tempConfig[joined] = null;
    }
    // set switchers
    const tempSwitchers = { ...switchers };
    tempSwitchers[joined] = obj;

    setSwitchers(tempSwitchers);
    setConfig(tempConfig);
  };

  let display = "";
  if (loadedCompleted) {
    display = (
      <>
        {configTitle}
        <SwitchComponentWrapper>
          <Switch
            field_ref={"destroy_card"}
            label={"Destroir o par de cartas depois de descoberto"}
            value={config.destroy_card}
            switchHandler={changeHandler}
          />
        </SwitchComponentWrapper>
        <SwitchComponentWrapper>
          <Switch
            field_ref={"time_to_complete_switcher"}
            label={"Tempo para completar o jogo"}
            value={switchers.time_to_complete}
            switchHandler={switcherHandler}
          />
          <NumberFieldWrapper>
            <NumberField
              disabled={!switchers.time_to_complete}
              field_ref={"time_to_complete"}
              label={"Segundos"}
              value={config.time_to_complete}
              parentChangeHandler={changeHandler}
            />
          </NumberFieldWrapper>
        </SwitchComponentWrapper>
        <SwitchComponentWrapper>
          <Switch
            field_ref={"max_attempts_switcher"}
            label={"Tentativas máximas"}
            value={switchers.max_attempts}
            switchHandler={switcherHandler}
          />
          <NumberFieldWrapper>
            <NumberField
              disabled={!switchers.max_attempts}
              field_ref={"max_attempts"}
              label={"Segundos"}
              value={config.max_attempts}
              parentChangeHandler={changeHandler}
            />
          </NumberFieldWrapper>
        </SwitchComponentWrapper>
        <NumberFieldWrapper>
          <ListField
            arr={total_images_arr}
            field_ref={"total_images"}
            label={"Pares de imagens do jogo"}
            value={config.total_images}
            parentChangeHandler={changeHandler}
          />
        </NumberFieldWrapper>
        {assetsTitle}
        <ImageField
          title={"Imagem da carta virada"}
          field_ref={"back_card"}
          imageObj={assets.images.back_card}
          parentChangeHandler={imageHandler}
        />
        {assets.images.front_cards.map((image, index) => (
          <ImageField
            title={"Image do par " + (index + 1)}
            key={index}
            field_ref={`front_cards_${index}`}
            imageObj={image}
            parentChangeHandler={imageHandler}
          />
        ))}
      </>
    );
  }

  return <>{display}</>;
};

export default EditMemory;

const Container = styled.div``;

const SwitchComponentWrapper = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: flex-start; */
  justify-content: center;
  width: 100%;
`;

const NumberFieldWrapper = styled.div`
  width: 30%;
`;
