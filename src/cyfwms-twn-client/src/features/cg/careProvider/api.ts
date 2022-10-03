import axiosInstance from "../../../library/axiosInstance";
import type { Data } from "./slice";
import type { AxiosResponse } from "axios";

/**
 * Fetch one/single `Care Provider` of `CG` module.
 * @param id - Primary key of `cg_care_provider` table.
 * @param token - JSON Web Token
 */
export const doGetAPI = async (
  id: number,
  token: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    `cg/care_provider/read/${id}`,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  return res;
};

/**
 * Save one/single `Care Provider` of `CG` module.
 * @param formData -
 * @param token - JSON Web Token
 */
export const doPostAPI = async (
  formData: Data,
  token: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.put(
    "cg/care_provider/save/",
    formData,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  return res;
};
