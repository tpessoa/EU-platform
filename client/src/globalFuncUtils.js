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
