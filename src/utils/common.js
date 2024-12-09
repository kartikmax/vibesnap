export const isImageOrVideo = (url) => {
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"];
  const videoExtensions = ["mp4", "webm", "ogg", "mkv", "mov", "avi", "flv"];

  if (imageExtensions.some((ext) => url.includes(ext))) {
    return "image";
  }

  if (videoExtensions.some((ext) => url.includes(ext))) {
    return "video";
  }
};
