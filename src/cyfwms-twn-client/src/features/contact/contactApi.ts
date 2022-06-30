import axios from "axios";
import type { AxiosResponse } from "axios";
import { ContactGetData, ContactPostData } from "./contactSlice";

const axiosInstance = axios.create({
  baseURL: "https://cyfwms-twn.azurewebsites.net/v1/participantservice/",
});

export const doGetContactAPI = async (
  data: ContactGetData,
  jwtToken: string
): Promise<AxiosResponse> => {
  console.log(data);
  const res: AxiosResponse = await axiosInstance.get(
    "readParticipantContact/" + data,
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};

export const doPostContactAPI = async (
  data: ContactPostData,
  jwtToken: string
): Promise<AxiosResponse> => {
  console.log(data);
  const res: AxiosResponse = await axiosInstance.put(
    "saveParticipantContact/",
    data.user,
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};
