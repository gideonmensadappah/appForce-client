import { IUser } from "../interfaces/user/user-interface";

export const searchMatch = (arr: IUser[], searchkey: string = "") => {
  let matchedKeys = [];

  for (let i = 0; i < arr.length; i++) {
    const { name } = arr[i];
    const { first = "", last = "", title } = name ?? {};

    const fullname =
      title?.toLowerCase() +
      " " +
      first?.toLowerCase() +
      " " +
      last?.toLowerCase();

    if (fullname.match(searchkey.toLowerCase())) {
      matchedKeys.push(arr[i]);
    }
  }
  return matchedKeys;
};
