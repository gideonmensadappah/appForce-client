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
