import axios from "axios";
import { getAuth } from "./storage";

const APP_API_MAIN_URL = process.env.REACT_APP_API_MAIN_URL;

export default function apiCaller(endpoint, method = "GET", data = null) {
  return axios({
    method,
    url: `${APP_API_MAIN_URL}/${endpoint}`,
    ...data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuth()?.accessToken}`,
      ...data?.headers,
    },
  })
    .then((res) => res.data);
}
