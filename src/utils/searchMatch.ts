import { IUser } from "../interfaces/user/user-interface";

export const searchMatch = (arr: IUser[], searchkey: string) => {
  let matchedKeys = [];

  for (let i = 0; i < arr.length; i++) {
    const name =
      arr[i].name?.first.toLowerCase() + //IF THERE IS NO LAST NAME --> WILLL FAIL CAUSE OF UNDEFINED!!
      " " +
      arr[i].name?.last.toLowerCase();
    if (name.match(searchkey.toLowerCase())) {
      matchedKeys.push(arr[i]);
    }
  }
  return matchedKeys;
};
