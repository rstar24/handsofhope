import {
  FamilyPhysiciansGetData,
  FamilyPhysiciansPostData,
} from "./familyPhysiciansSlice";
import axios from "axios";
import type { AxiosResponse } from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:9088/v1/participantservice/",
});

export const doGetFamilyPhysiciansAPI = async (
  data: FamilyPhysiciansGetData,
  jwtToken: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    "getAllFamilyPhysicians/" + data,
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};

export const doPostFamilyPhysiciansAPI = async (
  data: FamilyPhysiciansPostData,
  jwtToken: string
): Promise<AxiosResponse> => {
  console.log(data);
  const res: AxiosResponse = await axiosInstance.put(
    "saveAllFamilyPhysicians/",
    data.user,
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};
