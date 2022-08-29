import axios, { AxiosResponse } from "axios";

export const postRequest = <T>(
  url: string,
  payload: any,
  auth: boolean = false
): Promise<AxiosResponse<T>> =>
  axios.post(url, payload, {
    baseURL: process.env.API_URL,
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
    baseURL: process.env.API_URL,
    headers: {
      authorization: auth ? `Bearer ${localStorage.getItem("token")!}` : "",
    },
  });
