import React, { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { useParams, useLocation } from "react-router-dom";
import { getVideoIDByURL } from "../../../../globalFuncUtils";
import Table from "../../Table";
import Snackbar from "../../../Snackbar";
import Loading from "../../../UI/Loading";
import Error from "../../../UI/Error";

const createData = (id, title, thumbnail, actions) => {
  return { id, title, thumbnail, actions };
};

const cols = [
  {
    name: "Título",
    align: "left",
  },
  {
    name: "Thumbnail",
    align: "center",
  },
  {
    name: "Ações",
    align: "center",
  },
];
const actionsCURD = ["Editar", "Eliminar"];

const VideosTable = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const catId = query.get("id");

  const queryStringId = "getVideosFromCategory";
  const { isLoading, isError, error, data } = useQuery(queryStringId, () =>
    axios.get(`/api/videos/${catId}`)
  );

  if (isLoading) return <Loading />;
  if (isError) return <Error error={error} />;

  const rows = [];
  data.data.forEach((elem) => {
    const { _id, title } = elem;
    let thumbnail;
    try {
      const id = getVideoIDByURL(elem.url);
      thumbnail = `https://img.youtube.com/vi/${id}/sddefault.jpg`;
    } catch {
      thumbnail = `https://img.youtube.com/vi/error/sddefault.jpg`;
    }

    rows.push(createData(_id, title, thumbnail, actionsCURD));
  });

  return (
    <>
      <Table
        video={true}
        onlineImage={true}
        rows={rows}
        cols={cols}
        editURL={"/admin/edit/video"}
        deleteURL={"/api/videos/video"}
        fetchQuery={queryStringId}
      />
    </>
  );
};

export default VideosTable;
