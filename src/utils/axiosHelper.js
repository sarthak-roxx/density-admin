/* eslint-disable  */

import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: "https://api-dev-admin.density.exchange",
});

axiosInstance.defaults.headers.common.accept = "*/*";
axiosInstance.defaults.headers.common.rid = "anti-csrf";

export const makeGetReq = async (apiRoute, payload) => {
  const { data } = await axiosInstance.get(apiRoute);
  return data;
};

export const makePostReq = async (apiRoute, payload) => {
  const res = await axiosInstance.post(apiRoute, payload);
  return res;
};

export const makePatchReq = async (apiRoute, payload) => {
  const { data } = await axiosInstance.patch(apiRoute, payload);
  return data;
};

export const makeDeleteReq = async (apiRoute) => {
  const res = await axiosInstance.delete(apiRoute);
  return res;
};

export default axiosInstance;
