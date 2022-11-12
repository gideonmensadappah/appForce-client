import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { setNewUser } from "../../redux/user/user-reducer";
import { CustomButton } from "../CustomButton";
import SendIcon from "@mui/icons-material/Add";

const style = { width: "60px", height: "60px", borderRadius: "40px" };

const CreateUser = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleOpenCreateUserModal = () => {
    dispatch(setNewUser());
  };

  const props = {
    style,
    onClick: handleOpenCreateUserModal,
  };

  return (
    <div className='create-user-section'>
      <CustomButton {...props}>
        <SendIcon />
      </CustomButton>
    </div>
  );
};

export default CreateUser;
