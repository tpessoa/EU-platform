import React from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";

import UpdateImages from "./UpdateImages";

import Loading from "../../UI/Loading";
import Error from "../../UI/Error";

const GetImages = (props) => {
  const { tempId, permanentId } = props;

  // console.log(tempId);
  // console.log(permanentId);

  const getTemporary = useQuery(
    `swap_${tempId}_for_${permanentId}`,
    () => axios(`/api/upload/images/${tempId}`),
    { refetchOnWindowFocus: false }
  );

  let display = "";
  if (getTemporary.isLoading) {
    display = <Loading />;
  } else if (getTemporary.isError) {
    display = <Error error={getTemporary.error} />;
  } else if (getTemporary.isSuccess) {
    const IDsArr = [];
    getTemporary.data.data.forEach((image) => IDsArr.push(image._id));
    display = <UpdateImages IDs={IDsArr} permanentId={permanentId} />;
  }

  return <>{display}</>;
};

export default GetImages;
