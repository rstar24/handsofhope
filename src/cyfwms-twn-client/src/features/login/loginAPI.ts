import axios from "axios";
import type { LoginData } from "./loginSlice";
import type { AxiosResponse } from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:9088/v1/login/authenticate",
});

export const doLoginAPI = async (data: LoginData): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.post("", data);
  return res;
};
