export const getVideoIDByURL = (videoURL) => {
  const splitLinkArr = videoURL.split("/");
  const watch = splitLinkArr[3].split("?v=");
  const id = watch[1];

  return id;
};

export const getVideoIDbyThumbnailURL = (thumbURL) => {
  const splitLinkArr = thumbURL.split("/");
  return splitLinkArr[4];
};

export const getEmbedURL = (videoId) => {
  return `https://www.youtube.com/embed/${videoId}`;
};
