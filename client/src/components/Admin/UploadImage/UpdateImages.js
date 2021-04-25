import React, { useState, useEffect } from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";

import Loading from "../../UI/Loading";
import Error from "../../UI/Error";

const UpdateImages = (props) => {
  const { IDs, permanentId } = props;
  const setPermanent = useMutation(
    () =>
      axios({
        method: "post",
        url: `/api/upload/images`,
        data: {
          permanentId: permanentId,
          imagesIDs: IDs,
        },
      }),

    {
      // onSuccess: () => queryClient.invalidateQueries(fetchQuery),
    }
  );

  useEffect(() => {
    setPermanent.mutate();
  }, []);

  let display = "";
  if (setPermanent.isLoading) display = <Loading />;
  if (setPermanent.isError) display = <Error error={setPermanent.error} />;
  if (setPermanent.isSuccess) {
    console.log(setPermanent.data.data);
  }
  return <>{display}</>;
};

export default UpdateImages;
