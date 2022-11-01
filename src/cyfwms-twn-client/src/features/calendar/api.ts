import axiosInstance from "../../library/axiosInstance";
import type { AxiosResponse } from "axios";

export const doGetAPI = async (
  appointmentId: number,
  token: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.get(
    `commanservice/readOneAppointment/${appointmentId}`,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  return res;
};

export const doGetByDateAPI = async (
    date: string,
    token: string
  ): Promise<AxiosResponse> => {
    const res: AxiosResponse = await axiosInstance.get(
      `commanservice/getAllCommonCalenderDate/${date}`,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    return res;
  };

export const doPostAPI = async (
  formData: FormData,
  token: string
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axiosInstance.put(
    "commanservice/saveParticipantIdentity/",
    formData,
    {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res;
};
