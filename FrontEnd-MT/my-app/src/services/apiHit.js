import axios from "axios";
import { baseUrl } from "../config/config";

let apiHit = axios.create({
  baseURL: baseUrl,
});
export default apiHit;
