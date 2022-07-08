import axios from "axios";
import type {
  CYFMSRegisterGetData,
  CYFMSRegisterPostData,
} from "./cyfmsRegisterSlice";
import type { AxiosResponse } from "axios";

const axiosInstance = axios.create({
  baseURL: `${
    process.env.REACT_APP_REST_API || "http://localhost:9088"
  }/v1/participantservice/`,
});

export const doGetCYFMSRegisterAPI = async (
  data: CYFMSRegisterGetData,
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    "readParticipantIdentity/" + data,
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};

export const doPostCYFMSRegisterAPI = async (
  data: CYFMSRegisterPostData,
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.put(
    "saveParticipantIdentity/",
    data.user,
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};
