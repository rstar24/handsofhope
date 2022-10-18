import axiosInstance from "../../../library/axiosInstance";
import type { Capacity } from "./slice";
import type { AxiosResponse } from "axios";

/**
 * Fetch one/single `Capacity` of `CG` module.
 * @param careProviderId - `CG` module `Care Provider` ID.
 * @param token - JSON Web Token
 */
export const doGetAPI = async (
  careProviderId: number,
  token: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    `caregiverservice/readCapacity/${careProviderId}`,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  return res;
};

/**
 * Save one/single `Capacity` of `CG` module.
 * @param formData
 * @param token - JSON Web Token
 */
export const doPostAPI = async (
  formData: Capacity,
  token: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.put(
    "caregiverservice/saveCapacity",
    formData,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  return res;
};
