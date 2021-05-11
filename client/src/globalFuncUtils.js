export const getVideoIDByURL = (videoURL) => {
  const splitLinkArr = videoURL.split("/");
  if (splitLinkArr.length === 4) {
    const watch = splitLinkArr[3].split("?v=");
    const id = watch[1];

    return id;
  }
  return null;
};

export const getVideoIDbyThumbnailURL = (thumbURL) => {
  const splitLinkArr = thumbURL.split("/");
  return splitLinkArr[4];
};

export const getEmbedURL = (videoId) => {
  return `https://www.youtube.com/embed/${videoId}`;
};

export const verifyImageFileType = (imageType) => {
  const arr = imageType.split("/");
  const type = arr.pop();
  const suportedTypes = ["jpg", "jpeg", "png"];
  return suportedTypes.includes(type);
};

export const updateForm = (userInput, types, fields) => {
  for (let i = 0; i < types.length; i++) {
    const type = types[i];
    userInput[type] = fields[type];
  }
  return userInput;
};

export const filesToUploadInfo = (userInput, arr_types) => {
  let upload = [];
  let update = [];
  for (let i = 0; i < arr_types.length; i++) {
    const type = arr_types[i];
    if (userInput[type].length) {
      upload.push(type);
    } else {
      update.push(type);
    }
  }
  return { upload, update };
};
