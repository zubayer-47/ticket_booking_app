import axios from "axios";

export const ORIGIN = `http://localhost:8000/`;

export default axios.create({
  baseURL: `${ORIGIN}`,
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});
