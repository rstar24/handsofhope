import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_REST_API || "http://localhost:9088"}/v1/`,
});

export default axiosInstance;
