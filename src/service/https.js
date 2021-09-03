import axios from "axios";

const HttpClient = (config) => {
  const headerOptions = {
    "Content-type": "application/json",
    "cache-control": "no-cache",
  };

  return axios.create({
    baseURL: process.env.REACT_APP_API_SERVER, // ENV LOCAL IS "HTTP://"
    headers: headerOptions,
  });
};

HttpClient.propTypes = {};

export default HttpClient;
