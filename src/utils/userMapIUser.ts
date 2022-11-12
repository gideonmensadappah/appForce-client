import uniqid from "uniqid";
import { EditUser } from "../components/CustomModal/index";
import { IUser } from "../interfaces/user/user-interface";

export const userMapIUser = (user: EditUser): IUser => {
  const { firstName, lastName, title, email, street, ...rest } = user;

  return {
    image: {
      medium: "",
    },
    id: uniqid(),
    name: {
      first: firstName,
      last: lastName,
      title,
    },
    email,
    location: {
      ...rest,
      street: {
        name: street,
        number: 1,
      },
    },
  };
};

export const IUserMapEditUser = (user: IUser): EditUser => {
  const {
    name: { first: firstName = "", last: lastName = "", title = "" },
    email = "",
    location,
  } = user;

  return {
    firstName,
    lastName,
    title,
    email,
    country: location.country,
    city: location.city,
    street: location.street.name,
  };
};
