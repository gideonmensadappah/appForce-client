import axios from "axios";
import { BASE_URL } from "./base-url";

export const GET = async <T>(url: string): Promise<any> => {
  return await await axios.get<T>(`${BASE_URL}${url}`);
};
