import axios from "axios";
import type { RegisterGetData, RegisterPostData } from "./registerSlice";
import type { AxiosResponse } from "axios";

const axiosInstance = axios.create({
  baseURL: "https://cyfwms-twn-app.azurewebsites.net/v1/participantservice/",
});

export const doGetRegisterAPI = async (
  data: RegisterGetData,
  jwtToken: string
): Promise<AxiosResponse> => {
  console.log(data);
  const res: AxiosResponse = await axiosInstance.get(
    "readParticipantIdentity/" + data,
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};

export const doPostRegisterAPI = async (
  data: RegisterPostData,
  jwtToken: string
): Promise<AxiosResponse> => {
  console.log(data);
  const res: AxiosResponse = await axiosInstance.put(
    "saveParticipantIdentity/",
    data.user,
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};
