import axiosInstance from "../../../library/axiosInstance";
import type { CareProvider } from "./slice";
import type { AxiosResponse } from "axios";

/**
 * Save a `Care Provider` of `CG` module.
 * @param formData - New Care Provider data
 * @param token - JSON Web Token
 */
export const doPostAPI = async (
  formData: CareProvider,
  token: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.put(
    "caregiverservice/care_provider/save",
    formData,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  return res;
};

/**
 * Fetch a `Care Provider` of `CG` module.
 * @param id - Id of Care Provider
 * @param token - JSON Web Token
 */
export const doGetAPI = async (
  id: number,
  token: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    `caregiverservice/care_provider/read/${id}`,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  return res;
};
