import React from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Loading from "../../../UI/Loading";
import Error from "../../../UI/Error";
import { useWorksInPoll } from "../../../../hooks/usePolls";

const useStyles = makeStyles((theme) => ({
  delete: {
    background: theme.palette.error.main,
    color: "#fff",
    margin: theme.spacing(0.5),

    "&:hover": {
      background: theme.palette.error.light,
    },
  },
}));

const Delete = (props) => {
  const { deleteURL, fetchQuery, rowId } = props;
  const classes = useStyles();

  const queryClient = new useQueryClient();
  const mutation = useMutation(async () => await axios.delete(`${deleteURL}`), {
    onSuccess: () => queryClient.invalidateQueries(fetchQuery),
  });

  const deleteHandler = async () => {
    if (fetchQuery === "polls") {
      console.log("deleting works inside poll");
      const worksInPoll = await axios({
        method: "get",
        url: `/api/polls/all-poll-works/${rowId}`,
      });

      for (const work of worksInPoll.data) {
        await axios({
          method: "delete",
          url: `/api/polls/delete-work/${work._id}`,
        });
      }
    } else if (fetchQuery === "video-categories") {
      console.log("deleting videos inside category");
      const categoryVideos = await axios({
        method: "get",
        url: `/api/videos/category-videos/${rowId}`,
      });

      console.log(categoryVideos);
      for (const video of categoryVideos.data) {
        await axios({
          method: "delete",
          url: `/api/videos/video/${video._id}`,
        });
      }
    }
    mutation.mutate();
  };

  let display = "";
  if (mutation.isError) {
    display = <Error error={mutation.error} />;
  } else if (mutation.isLoading) {
    display = <Loading />;
  } else {
    display = (
      <Button
        size="small"
        variant="contained"
        className={classes.delete}
        onClick={deleteHandler}
      >
        Eliminar
      </Button>
    );
  }

  return <>{display}</>;
};

export default Delete;
