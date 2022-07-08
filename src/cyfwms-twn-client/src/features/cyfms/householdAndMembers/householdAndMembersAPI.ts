import axios from "axios";
import type {
  HouseholdAndMembersGetData,
  HouseholdAndMembersPostData,
} from "./householdAndMembersSlice";
import type { AxiosResponse } from "axios";

const axiosInstance = axios.create({
  baseURL: `${
    process.env.REACT_APP_REST_API || "http://localhost:9088"
  }/v1/participantservice/`,
});

export const doGetHouseholdAndMembersAPI = async (
  data: HouseholdAndMembersGetData,
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    "getAllHouseholdMembers/" + data,
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};

export const doPostHouseholdAndMembersAPI = async (
  data: HouseholdAndMembersPostData,
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.put(
    "saveAllHouseholdMembers/",
    data.recordList,
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};
