import axios from "axios";
import type { cyfmsContactData } from "./cyfmsContactSlice";
import type { AxiosResponse } from "axios";

const axiosInstance = axios.create({
  baseURL: `${
    process.env.REACT_APP_REST_API || "http://localhost:9088"
  }/v1/participantservice/`,
});

export const doGetContactAPI = async (
  participantId: number,
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    "readParticipantContact/" + participantId,
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};

export const doPostContactAPI = async (
  contactData: cyfmsContactData,
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.put(
    "saveParticipantContact/",
    contactData,
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};
