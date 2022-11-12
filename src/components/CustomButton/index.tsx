import { FC } from "react";
import Button from "@mui/material/Button";

export const CustomButton: FC<any> = (props) => {
  const { children, ...rest } = props;
  return (
    <Button {...rest} variant='contained'>
      {children}
    </Button>
  );
};
