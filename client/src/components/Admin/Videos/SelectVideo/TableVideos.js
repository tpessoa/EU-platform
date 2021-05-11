import React from "react";
import Table from "../../Table";
import { useRouteMatch } from "react-router-dom";
import { cols, createData } from "../../Table/table.utils";
import { useCategoryVideos } from "../../../../hooks/useVideos";
import { getVideoIDByURL } from "../../../../globalFuncUtils";

import Loading from "../../../UI/Loading";
import Error from "../../../UI/Error";

const TableVideos = (props) => {
  const { path, url } = useRouteMatch();
  const { catId } = props;
  const videos = useCategoryVideos(catId);
  if (videos.isLoading) return <Loading />;
  if (videos.isError) return <Error error={videos.error} />;

  console.log(videos.data);
  const rows = [];
  videos.data.forEach((elem) => {
    const { _id, title } = elem;
    let thumbnail;
    try {
      const id = getVideoIDByURL(elem.url);
      thumbnail = `https://img.youtube.com/vi/${id}/sddefault.jpg`;
    } catch {
      thumbnail = `https://img.youtube.com/vi/error/sddefault.jpg`;
    }

    rows.push(createData(_id, title, thumbnail, ["Editar", "Eliminar"]));
  });
  console.log(rows);
  return (
    <Table
      video={true}
      onlineImage={true}
      rows={rows}
      cols={cols}
      editURL={`${url}/edit`}
      deleteURL={"/api/videos/video"}
      fetchQuery={"all-videos-in-category"}
    />
  );
};

export default TableVideos;
