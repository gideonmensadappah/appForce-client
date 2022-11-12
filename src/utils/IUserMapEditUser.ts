import { IUser } from "../interfaces/user/user-interface";
import { EditUser } from "../components/CustomModal/index";

export const IUserMapEditUser = (user: IUser): EditUser => {
  const { name, email = "", location } = user;
  const { first = "", last = "", title = "" } = name ?? {};
  const { country = "", city, street } = location ?? {};

  return {
    firstName: first,
    lastName: last,
    title,
    email,
    country: country,
    city: city,
    street: street?.name,
  };
};
