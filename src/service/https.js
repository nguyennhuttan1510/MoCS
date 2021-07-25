import axios from "axios";

const HttpClient = (config) => {
  const headerOptions = {
    "Content-type": "application/json",
    "cache-control": "no-cache",
  };

  //   const itemLocalStorage = 'user';

  //   if (config) {
  //     if (config.useAccessToken) {
  //       const currentUser = JSON.parse(localStorage.getItem(itemLocalStorage));
  //       headerOptions.Authorization = `Bearer ${currentUser.access_token}`;
  //     }
  //   }

  return axios.create({
    baseURL: "http://localhost:5000/", // ENV LOCAL IS "HTTP://"
    headers: headerOptions,
  });
};

HttpClient.propTypes = {};

export default HttpClient;
