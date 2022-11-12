import { IUser } from "../interfaces/user/user-interface";

export const hasAllValues = (user: IUser) => {
  const { name, email, location } = user;
  const { first, last, title } = name;
  const { city, street, country } = location;

  return title && first && last && email && country && city && street.name;
};
