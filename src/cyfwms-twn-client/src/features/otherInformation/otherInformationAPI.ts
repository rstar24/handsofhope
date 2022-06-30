import axios from "axios";
import type { AxiosResponse } from "axios";
import {
  OtherInformationGetData,
  OtherInformationPostData,
} from "./otherInformationSlice";

const axiosInstance = axios.create({
  baseURL: "http://localhost:9088/v1/participantservice/",
});

export const doGetOtherInformationAPI = async (
  data: OtherInformationGetData,
  jwtToken: string
): Promise<AxiosResponse> => {
  console.log(data);
  const res: AxiosResponse = await axiosInstance.get(
    "readParticipantOtherInformation/" + data,
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};

export const doPostOtherInformationAPI = async (
  data: OtherInformationPostData,
  jwtToken: string
): Promise<AxiosResponse> => {
  console.log(data);
  const res: AxiosResponse = await axiosInstance.put(
    "saveParticipantOtherInformation/",
    data.user,
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};
