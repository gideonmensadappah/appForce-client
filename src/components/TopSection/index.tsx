import { FC } from "react";
import SearchInput from "../SearchInput/index";

type Props = {
  handleUserTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const TopSection: FC<Props> = ({ handleUserTextChange }) => {
  return (
    <div className='top-section-wrapper'>
      <SearchInput handleChange={handleUserTextChange} />
    </div>
  );
};

export default TopSection;
