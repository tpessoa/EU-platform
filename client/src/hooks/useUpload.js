import axios from "axios";

const debug = false;

export const uploadImages = async (input, fields, createNew) => {
  try {
    for await (const [key, value] of Object.entries(input)) {
      // verify input files
      if (value instanceof FileList) {
        if (debug) console.log(key);
        // verify if its a new or not changed input
        if (!value.length) {
          if (debug) console.log("no file");
          // copy old info to the new obj
          input[key] = { ...fields[key] };

          // verify if its updated
        } else if (value.length) {
          if (debug) console.log("file exists");
          const form = new FormData();
          form.append("image", value[0]);
          if (!createNew) {
            // delete old image & wait for database
            await axios({
              method: "delete",
              url: "/api/upload/image",
              data: { image: fields[key] },
            })
              .then((res) => {
                if (debug) console.log(res.data);
              })
              .catch((e) => {
                if (debug) console.log(e);
              });
          }
          // upload new
          if (debug) console.log("uploading");
          // wait for database
          await axios({
            method: "post",
            url: "/api/upload/image",
            data: form,
            headers: {
              "content-Type": "multipart/form-data",
            },
          })
            .then((res) => {
              if (debug) console.log(res.data);
              input[key] = { ...res.data };
            })
            .catch((e) => {
              if (debug) console.log(e);
            });
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
  return input;
};
