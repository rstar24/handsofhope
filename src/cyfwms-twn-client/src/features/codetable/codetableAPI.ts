import axios, { AxiosResponse } from "axios";

const axiosInstance = axios.create({
  baseURL: `${
    process.env.REACT_APP_REST_API || "http://localhost:9088"
  }/v1/dataservice/`,
});

export const doGenderGetAPI = async (
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get("gender", {
    headers: { Authorization: "Bearer " + jwtToken },
  });
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

export const doGetEducationAPI = async (
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get("education", {
    headers: { Authorization: "Bearer " + jwtToken },
  });
  return res;
};

export const doGetTypeOfEmployeeAPI = async (
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get("typeofemployee", {
    headers: { Authorization: "Bearer " + jwtToken },
  });
  return res;
};
