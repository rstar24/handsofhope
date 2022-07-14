import axios from "axios";
import type { cyfmsOtherInformationData } from "./cyfmsOtherInformationSlice";
import type { AxiosResponse } from "axios";

const axiosInstance = axios.create({
  baseURL: `${
    process.env.REACT_APP_REST_API || "http://localhost:9088"
  }/v1/participantservice/`,
});

export const doGetOtherInformationAPI = async (
  participantId: number,
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    "readParticipantOtherInformation/" + participantId,
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};

export const doPostOtherInformationAPI = async (
  cyfmsHouseholdMembersFormData: cyfmsOtherInformationData,
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.put(
    "saveParticipantOtherInformation/",
    cyfmsHouseholdMembersFormData,
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};
