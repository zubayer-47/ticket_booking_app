import axios from "axios";

// export const ORIGIN = `https://bus-booking-api.onrender.com/v1`;
export const ORIGIN = import.meta.env.PROD
  ? import.meta.env.BASE_URL
  : "http://localhost:8000/v1";

export const api = axios.create({
  baseURL: `${ORIGIN}`,
  withCredentials: false,
  headers: {
    "Content-type": "application/json",
  },
});

api.interceptors.request.use(
  function (config) {
    const _token = localStorage.getItem("_token");

    config.headers.Authorization = JSON.parse(_token ?? '""');

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// api.interceptors.response.use(
//   function (config) {
//     const _token = localStorage.getItem("_token");

//     config.headers.Authorization = _token;

//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );
