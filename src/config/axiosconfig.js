import axios from "axios";
import env_variables from "../config/envconfig";
const BASE_URL = import.meta.env.VITE_BASE_URL;
//const BASE_URL = env_variables.VITE_SERVER_URL;
export default axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
