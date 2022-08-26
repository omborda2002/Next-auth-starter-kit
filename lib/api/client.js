import axios from "axios";

const client = axios.create({
  baseURL: `${process.env.BASE_URL}`,
  withCredentials: true
});
client.interceptors.request.use(function (config) {
  const token = localStorage.getItem("next-server-token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default client;
