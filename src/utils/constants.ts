export const getMediaServerUrl = () => {
  if (process.env.REACT_APP_ENVIRONMENT === "PROD") {
    return process.env.REACT_APP_MEDIASERVER_URL_PROD || "";
  } else {
    return process.env.REACT_APP_MEDIASERVER_URL_DEV || "";
  }
};

export const getToken = () => {
  return localStorage.getItem("token")?.replace("Bearer ", "") || "";
};
