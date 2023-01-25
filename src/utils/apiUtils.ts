import axios, { AxiosResponse } from "axios";

const API_URL =
  process.env.NODE_ENV === "PRODUCTION"
    ? "https://yjartjournal-api.vercel.app"
    : "http://localhost:3000";

export const postRequest = <T>(
  url: string,
  payload: any,
  auth: boolean = false
): Promise<AxiosResponse<T>> =>
  axios.post(url, payload, {
    baseURL: API_URL,
    headers: {
      authorization: auth ? `Bearer ${localStorage.getItem("token")!}` : "",
    },
  });

export const getRequest = <T>(
  url: string,
  data?: any,
  auth: boolean = false
): Promise<AxiosResponse<T>> =>
  axios.get(url, {
    data,
    baseURL: API_URL,
    headers: {
      authorization: auth ? `Bearer ${localStorage.getItem("token")!}` : "",
    },
  });
