import axios from "axios";

export const ORIGIN = `https://bus-booking-api.onrender.com/v1`;

export default axios.create({
  baseURL: `${ORIGIN}`,
  headers: {
    "Content-type": "application/json",
  },
});
