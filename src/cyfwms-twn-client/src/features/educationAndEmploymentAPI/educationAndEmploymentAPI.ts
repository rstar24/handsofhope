import axios from "axios";
import type { AxiosResponse } from "axios";
import {
  EducationAndEmploymentGetData,
  EducationAndEmploymentPostData,
} from "./educationAndEmploymentSlice";

const axiosInstance = axios.create({
  baseURL: "https://cyfwms-twn.azurewebsites.net/v1/participantservice/",
});

export const doGetEducationAndEmploymentAPI = async (
  data: EducationAndEmploymentGetData,
  jwtToken: string
): Promise<AxiosResponse> => {
  console.log(data);
  const res: AxiosResponse = await axiosInstance.get(
    "readEmploymentAndEducation/" + data,
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};

export const doPostEducationAndEmploymentAPI = async (
  data: EducationAndEmploymentPostData,
  jwtToken: string
): Promise<AxiosResponse> => {
  console.log(data);
  const res: AxiosResponse = await axiosInstance.put(
    "saveEmploymentAndEducation/",
    data.user,
    {
      headers: { Authorization: "Bearer " + jwtToken },
    }
  );
  return res;
};
