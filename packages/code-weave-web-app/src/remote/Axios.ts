import axios from "axios";

export const axiosInstance = axios.create({
  //   baseURL: "http://localhost:4500",
  headers: {
    "Content-Type": "application/json",
  },
});
