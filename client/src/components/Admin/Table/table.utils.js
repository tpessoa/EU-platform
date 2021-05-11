const actionsCURD = ["Editar", "Eliminar"];

export const createData = (id, title, thumbnail, actions) => {
  return { id, title, thumbnail, actions };
};

export const cols = [
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

export const generateRows = (data) => {
  const tempRows = [];
  data.forEach((elem) => {
    const { _id, title, thumbnail } = elem;
    tempRows.push(createData(_id, title, thumbnail, actionsCURD));
  });
  return tempRows;
};
