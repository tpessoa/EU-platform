import React, { useState, useEffect } from "react";
import axios from "axios";

const Upload = () => {
  const [name, setName] = useState("imagem_teste");
  const [file, setFile] = useState("");

  return (
    <>
      <form
        action="/api/admin/uploadImg"
        enctype="multipart/form-data"
        method="POST"
      >
        <input type="file" name="myImage" accept="image/*" />
        <input type="submit" value="Upload Pho to" />
      </form>
    </>
  );
};

export default Upload;
