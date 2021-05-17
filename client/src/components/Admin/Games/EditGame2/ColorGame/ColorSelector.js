import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { SketchPicker } from "react-color";
import ButtonForm from "../../../../Form/ButtonForm";

const useStyles = makeStyles((theme) => ({
  picker: {
    margin: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  button: {
    margin: theme.spacing(1, 0, 4, 0),
  },
}));

const ColorSelector = (props) => {
  const classes = useStyles();
  const { addColor, errors } = props;
  const [currentColor, setCurrentColor] = useState("#eb1717");

  const colorUpdateHandler = (color, ev) => {
    setCurrentColor(color.hex);
  };

  const colorChangeHandler = (color, ev) => {
    setCurrentColor(color.hex);
  };

  const addColorToGame = () => {
    addColor({ code: currentColor });
  };

  return (
    <div className={classes.picker}>
      <SketchPicker
        color={currentColor}
        disableAlpha={true}
        onChange={colorUpdateHandler}
        onChangeComplete={colorChangeHandler}
      />
      <ButtonForm
        className={classes.button}
        onClick={addColorToGame}
        error={errors?.config?.colors}
        helpertext={errors?.config?.colors?.message}
        fullWidth={true}
      >
        Adicionar cor
      </ButtonForm>
    </div>
  );
};

export default ColorSelector;
