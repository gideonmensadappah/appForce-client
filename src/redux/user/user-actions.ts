import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers } from "../../api/user";
import { Req } from "../../enums/req/req.enum";
import { resultsMapIUsers } from "../../utils/resultsMapIUsers";

export type Payload = {
  amountOfResult: number;
};

export const get_users = createAsyncThunk(
  "user/getUser",
  async (payload: Payload, { rejectWithValue }) => {
    try {
      const { data, status } = await getUsers(payload);
      if (status === Req.failed) throw new Error(data.message);
      const mappedResults = resultsMapIUsers(data);
      return { data: mappedResults };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
