import { FetchResponse, IUser } from "../interfaces/user/user-interface";
import uniqid from "uniqid";

export const resultsMapIUsers = (result: FetchResponse): Array<IUser> => {
  const { results } = result;
  return results.map((user) => {
    const { id, name, email, picture, location } = user;
    const { city, street, country } = location;
    const { medium } = picture;

    return {
      id: id.value! ?? uniqid(),
      name,
      email,
      image: { medium },
      location: {
        city,
        street: street,
        country,
      },
    };
  });
};
