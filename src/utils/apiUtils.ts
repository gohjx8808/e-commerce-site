import axios, { AxiosResponse } from "axios";

// eslint-disable-next-line import/prefer-default-export
export const postRequest = <T>(url: string, payload: any):Promise<AxiosResponse<T>> =>
  axios.post(url, payload, { baseURL: process.env.API_URL });
