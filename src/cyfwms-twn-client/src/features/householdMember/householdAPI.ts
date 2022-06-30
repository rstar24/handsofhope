import axios from "axios";
import type { AxiosResponse } from "axios";
import { HouseHoldGetData, HouseHoldPostData } from "./householdSlice";

const axiosInstance = axios.create({
  baseURL: `${
    process.env.REACT_APP_REST_API || "http://localhost:9088"
  }/v1/participantservice/`,
});

export const doGetHouseHoldAPI = async (
  data: HouseHoldGetData,
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

export const doPostHouseHoldAPI = async (
  data: HouseHoldPostData,
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.put(
    "saveAllHouseholdMembers/",
    data.user,
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};
