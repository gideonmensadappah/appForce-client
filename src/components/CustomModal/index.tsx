import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  currentUserSelector,
  radmonImageSelctor,
} from "../../redux/user/user-selector";

import { AppDispatch } from "../../redux/store";
import {
  createUser,
  unSetUser,
  updateUser,
} from "../../redux/user/user-reducer";
import Input from "../Input";
import { CustomButton } from "../CustomButton";

import useForm from "../../Hooks/useForm";
import { userMapIUser } from "../../utils/userMapIUser";

import "./styles.css";
import { IUserMapEditUser } from "../../utils/IUserMapEditUser";

const wrapperStyle = {
  width: "100%",
  height: "100%",
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  justifyContent: "center",
};

enum HeaderText {
  CREATE = "Create New User",
  UPDATE = "Update User",
}

export type EditUser = {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  city: string;
  street: string;
  image?: string;
};

const initialNewUser: EditUser = {
  title: "",
  firstName: "",
  lastName: "",
  email: "",
  country: "",
  city: "",
  street: "",
};

export const CustomModal = () => {
  const image = useSelector(radmonImageSelctor);
  const user = useSelector(currentUserSelector);
  const { handleChange, resetForm, errors, values } = useForm<
    EditUser,
    EditUser
  >({} as EditUser, {} as EditUser);

  const dispatch = useDispatch<AppDispatch>();

  const handleClose = () => {
    dispatch(unSetUser());
  };

  const handleSave = () => {
    // if (isEmpty(errors) || !hasAllValues(values)) {
    //   alert("feilds are not ok");
    //   return;
    // }

    const action = user?.id ? updateUser : createUser;

    dispatch(
      action({
        ...userMapIUser(values, user!),
        image: user?.image ? user?.image : image,
      })
    );
    dispatch(unSetUser());
    resetForm({});
  };

  const u = user?.id ? IUserMapEditUser(user) : initialNewUser;
  const headerText = user?.id ? HeaderText.UPDATE : HeaderText.CREATE;
  return (
    <Modal
      open={Boolean(user)}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <div style={wrapperStyle}>
        <Box className='wrapper_box'>
          <div>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              {headerText}
            </Typography>
            <Typography sx={{ mt: 2 }}>Email</Typography>
            <Typography sx={{ mt: 2 }}>
              <Input
                label='Email'
                name='email'
                value={values.email ?? u.email}
                onChange={handleChange}
              />
            </Typography>
            <Typography sx={{ mt: 2 }}>Name</Typography>
            <Typography sx={{ mt: 2 }}>
              <Input
                label='Title'
                name='title'
                value={values.title ?? u.title}
                onChange={handleChange}
                error={!!errors.title}
                autoComplete='off'
              />
            </Typography>
            <Typography sx={{ mt: 2 }}>
              <Input
                label='First Name'
                name='firstName'
                value={values.firstName ?? u.firstName}
                onChange={handleChange}
                error={!!errors.firstName}
                autoComplete='off'
              />
            </Typography>
            <Typography sx={{ mt: 2 }}>
              <Input
                label='Last Name'
                name='lastName'
                value={values.lastName ?? u.lastName}
                onChange={handleChange}
                error={!!errors.lastName}
                autoComplete='off'
              />
            </Typography>
            <Typography sx={{ mt: 2 }}>Location</Typography>
            <Typography sx={{ mt: 2 }}>
              <Input
                label='Country'
                name='country'
                value={values.country ?? u.country}
                onChange={handleChange}
                error={!!errors.country}
                autoComplete='off'
              />
            </Typography>
            <Typography sx={{ mt: 2 }}>
              <Input
                label='City'
                name='city'
                value={values.city ?? u.city}
                onChange={handleChange}
                error={!!errors.city}
                autoComplete='off'
              />
            </Typography>
            <Typography sx={{ mt: 2 }}>
              <Input
                label='Street'
                name='street'
                value={values.street ?? u.street}
                onChange={handleChange}
                error={!!errors.street}
                autoComplete='off'
              />
            </Typography>
            <div className='box-actions_wrapper'>
              <CustomButton onClick={handleClose}>Cancel</CustomButton>
              <CustomButton onClick={handleSave}>Save</CustomButton>
            </div>
          </div>
        </Box>
      </div>
    </Modal>
  );
};

export default CustomModal;

const isEmpty = (obj = {}) => Object.values(obj).filter((e) => e).length;
const hasAllValues = ({
  title,
  firstName,
  lastName,
  email,
  country,
  city,
  street,
}: EditUser) =>
  title && firstName && lastName && email && country && city && street;
