import axios from "axios";
import type { cyfmsFamilyPhysiciansRecord } from "./cyfmsFamilyPhysiciansSlice";
import type { AxiosResponse } from "axios";

const axiosInstance = axios.create({
  baseURL: `${
    process.env.REACT_APP_REST_API || "http://localhost:9088"
  }/v1/participantservice/`,
});

export const doGetFamilyPhysiciansAPI = async (
  participantId: number,
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    "getAllFamilyPhysicians/" + participantId,
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};

export const doPostFamilyPhysiciansAPI = async (
  cyfmsFamilyPhysiciansFormData: cyfmsFamilyPhysiciansRecord[],
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.put(
    "saveAllFamilyPhysicians/",
    cyfmsFamilyPhysiciansFormData,
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};
