import uniqid from "uniqid";
import { EditUser } from "../components/CustomModal/index";
import { IUser } from "../interfaces/user/user-interface";

export const userMapIUser = (user: EditUser, originalUser: IUser): IUser => {
  const { firstName, lastName, title, email, street, image, ...rest } = user;
  const {
    id,
    name,
    email: originalEmail = "",
    location,
    image: originalIamge,
  } = originalUser;
  const { first = "", last = "", title: originalTitle = "" } = name ?? {};
  const { street: originalStreet, ...originalRest } = location ?? {};
  const { name: originalStreetName } = originalStreet ?? {};

  return {
    image: {
      medium: image ?? originalIamge?.medium,
    },
    id: id ? id : uniqid(),
    name: {
      first: firstName ?? first,
      last: lastName ?? last,
      title: title ?? originalTitle,
    },
    email: email ?? originalEmail,
    location: {
      city: rest.city ?? originalRest.city,
      country: rest.country ?? originalRest.country,
      street: {
        name: street ?? originalStreetName,
      },
    },
  };
};
