import axios from "axios";
import type { cyfmsHouseholdMembersRecord } from "./cyfmsHouseholdMembersSlice";
import type { AxiosResponse } from "axios";

const axiosInstance = axios.create({
  baseURL: `${
    process.env.REACT_APP_REST_API || "http://localhost:9088"
  }/v1/participantservice/`,
});

export const doGetHouseholdMembersAPI = async (
  participantId: number,
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    "getAllHouseholdMembers/" + participantId,
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};

export const doPostHouseholdMembersAPI = async (
  cyfmsHouseholdMembersFormData: cyfmsHouseholdMembersRecord[],
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.put(
    "saveAllHouseholdMembers/",
    cyfmsHouseholdMembersFormData,
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};
