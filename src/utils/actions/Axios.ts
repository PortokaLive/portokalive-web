import axios from "axios";

export default () => {
  if (localStorage.getItem("token"))
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "token"
    );

  let backendUrl;
  let backendVersion;
  const {
    REACT_APP_ENVIRONMENT: env,
    REACT_APP_BACKEND_URL_DEV: devUrl,
    REACT_APP_BACKEND_URL_PROD: prodUrl,
    REACT_APP_BACKEND_VERSION_DEV: devVer,
    REACT_APP_BACKEND_VERSION_PROD: prodVer,
  } = process.env;
  switch (env) {
    case "PROD":
      backendUrl = prodUrl;
      backendVersion = prodVer;
      break;
    case "DEV":
      backendUrl = devUrl;
      backendVersion = devVer;
      break;
  }

  const client = axios.create({
    baseURL: `${backendUrl}/${backendVersion}`,
  });
  return client;
};
