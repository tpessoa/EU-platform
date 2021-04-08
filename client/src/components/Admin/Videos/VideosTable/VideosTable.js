import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import { getVideoIDByURL } from "../../../../globalFuncUtils";
import Table from "../../Table";

const createData = (id, title, thumbnail, actions) => {
  return { id, title, thumbnail, actions };
};

const cols_hc = [
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

  const [rows, setRows] = useState([]);
  const [cols, setCols] = useState([]);
  const [loadingCompleted, setLoadingCompleted] = useState(false);

  useEffect(() => {
    let mounted = true;
    // get all videos of one category by its ID;
    axios
      .get(`/api/videos/${catId}`)
      .then(function (res) {
        // console.log(res.data);
        const tempRows = [];
        res.data.forEach((elem) => {
          const { _id, title } = elem;
          let thumbnail;
          try {
            const id = getVideoIDByURL(elem.url);
            thumbnail = `https://img.youtube.com/vi/${id}/sddefault.jpg`;
          } catch {
            thumbnail = `https://img.youtube.com/vi/error/sddefault.jpg`;
          }

          tempRows.push(createData(_id, title, thumbnail, actionsCURD));
        });
        if (mounted) {
          setRows(tempRows);
          setLoadingCompleted(true);
          setCols(cols_hc);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    return () => {
      mounted = false;
    };
  }, [catId]);

  return (
    <>
      {loadingCompleted && (
        <Table
          rows={rows}
          cols={cols}
          editURL={"/admin/edit/video"}
          onlineImage={true}
        />
      )}
    </>
  );
};

export default VideosTable;
