import axios, { AxiosResponse } from "axios";

const axiosInstance = axios.create({
  baseURL: "https://cyfwms-twn-app.azurewebsites.net/v1/dataservice/",
});

export const doGenderGetAPI = async (
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get("gender", {
    headers: { Authorization: "Bearer " + jwtToken },
  });
  console.log("codetable", res);
  return res;
};

export const doGetMaritalStatusAPI = async (
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get("maritalstatus", {
    headers: { Authorization: "Bearer " + jwtToken },
  });
  return res;
};

export const doGetRoleAPI = async (
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get("role", {
    headers: { Authorization: "Bearer " + jwtToken },
  });
  return res;
};
