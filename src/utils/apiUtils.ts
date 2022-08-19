import axios, { AxiosResponse } from "axios";

export const postRequest = <T>(
  url: string,
  payload: any
): Promise<AxiosResponse<T>> =>
  axios.post(url, payload, { baseURL: process.env.API_URL });

export const getRequest = <T>(
  url: string,
  data?: any
): Promise<AxiosResponse<T>> =>
  axios.get(url, { data, baseURL: process.env.API_URL });
