import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import axios from "axios";

import Loading from "../../UI/Loading";
import Error from "../../UI/Error";
import BackBtn from "../Buttons/Back";

const GetData = (props) => {
  console.log("getting data...");
  // const { setData, url } = props;
  // const { id } = useParams();
  // const fetchDataFlag = id.toString() !== "createNew";
  // const fetchQuery = `get${id}Info`;
  // const { isSuccess, isLoading, isError, error, data } = useQuery(
  //   fetchQuery,
  //   () =>
  //     axios({
  //       method: "get",
  //       url: url,
  //       params: {
  //         id: id,
  //       },
  //     }),
  //   {
  //     enabled: fetchDataFlag,
  //     refetchOnWindowFocus: false,
  //   }
  // );

  // if (!fetchDataFlag) {
  //   console.log("aqui?");
  //   setData({
  //     data: null,
  //     createNew: true,
  //     fetchUrl: fetchDataFlag,
  //   });
  // }

  // if (isLoading) return <Loading />;
  // if (isError) return <Error error={error} />;
  // if (isSuccess) {
  //   setData({ data: data.data, createNew: false, fetchUrl: fetchDataFlag });
  // }

  return <BackBtn>Voltar</BackBtn>;
};

export default GetData;
