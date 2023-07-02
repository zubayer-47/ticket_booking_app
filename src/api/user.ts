import axios from "axios";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export const fetchUser = () => {
  return axios.get<User[]>("/users", {
    baseURL: "localhost",
  });
};
