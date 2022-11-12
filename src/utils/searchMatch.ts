import { IUser } from "../interfaces/user/user-interface";

export const searchMatch = (arr: IUser[], searchkey: string = "") => {
  let matchedKeys = [];

  for (let i = 0; i < arr.length; i++) {
    const { id, email, name, location } = arr[i];
    const { first = "", last = "", title } = name ?? {};
    const { street, city, country } = location;
    const fullname =
      title?.toLowerCase() +
      " " +
      first?.toLowerCase() +
      " " +
      last?.toLowerCase();

    const fullLocation =
      street?.name.toLowerCase() +
      " " +
      city.toLowerCase() +
      " " +
      country.toLowerCase();

    if (fullname.match(searchkey.toLowerCase())) {
      matchedKeys.push(arr[i]);
      continue;
    }

    if (id.toLowerCase().match(searchkey.toLowerCase())) {
      matchedKeys.push(arr[i]);
      continue;
    }

    if (email.toLowerCase().match(searchkey.toLowerCase())) {
      matchedKeys.push(arr[i]);
      continue;
    }

    if (fullLocation.toLowerCase().match(searchkey.toLowerCase())) {
      matchedKeys.push(arr[i]);
      continue;
    }
  }
  return matchedKeys;
};
