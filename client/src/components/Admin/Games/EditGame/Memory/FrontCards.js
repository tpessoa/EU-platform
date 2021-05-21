import React from "react";
import UploadImage from "../../../../Form/UploadImage";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1, 0, 1, 0),
  },
}));

const FrontCards = (props) => {
  const classes = useStyles();

  const {
    index,
    item,
    control,
    register,
    remove,
    uploading,
    errors,
    total_cards,
    setValue,
  } = props;

  return (
    <div className={classes.root}>
      <UploadImage
        {...register(`assets.front_cards.${index}.pair`)}
        name={`assets.front_cards.${index}.pair`}
        type="file"
        // error={!!errors.assets?.front_card[index]?.pair}
        // helperText={errors?.assets?.front_card[index]?.pair?.message}
        error={false}
        helperText={""}
        description={`Par ${index + 1} de ${total_cards}`}
        image={{
          imagePath: item.pair,
          uploading: uploading,
        }}
      />
    </div>
  );
};

export default FrontCards;
