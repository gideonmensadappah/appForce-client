import { GET } from "./api-requests";
import { Payload } from "../redux/user/user-actions";
import { Response } from "../interfaces/api/response-interface";

export const getUsers = async (payload: Payload): Promise<Response> => {
  const { amountOfResult } = payload;
  const { data, status } = await GET(`?results=${amountOfResult}.`);
  return { data, status };
};
