import { FC } from "react";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import Input from "../Input";

type Props = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const sxStyle = {
  width: "90%",
  maxWidth: 500,
};
export const SearchInput: FC<Props> = ({ handleChange }) => {
  return (
    <Stack spacing={2} sx={sxStyle}>
      <Autocomplete
        id='free-solo-demo'
        freeSolo
        options={[]}
        renderInput={({ fullWidth, size, inputProps, ...rest }) => (
          <Input
            onChange={handleChange}
            {...{
              fullWidth,
              size,
              inputProps,
              placeholder: "Search",
              InputLabelProps: rest.InputLabelProps,
            }}
          />
        )}
      />
    </Stack>
  );
};
export default SearchInput;
