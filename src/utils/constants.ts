export const getMediaServerUrl = () => {
  if (process.env.REACT_APP_ENVIRONMENT === "PROD") {
    return process.env.REACT_APP_MEDIASERVER_URL_PROD || "";
  } else {
    return process.env.REACT_APP_MEDIASERVER_URL_DEV || "";
  }
};

export const getAPI = () => {
  if (process.env.REACT_APP_ENVIRONMENT === "PROD") {
    return `${process.env.REACT_APP_BACKEND_URL_PROD}/${process.env.REACT_APP_BACKEND_VERSION_PROD}`;
  } else {
    return `${process.env.REACT_APP_BACKEND_URL_DEV}/${process.env.REACT_APP_BACKEND_VERSION_DEV}`;
  }
};

export const getVideoAPI = () => {
  return process.env.REACT_APP_API_VIDEO_URL;
};

export const getToken = () => {
  return localStorage.getItem("token")?.replace("Bearer ", "") || "";
};
