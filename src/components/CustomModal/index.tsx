import { FC } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  currentUserSelector,
  radmonImageSelctor,
} from "../../redux/user/user-selector";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { createUser, unSetUser } from "../../redux/user/user-reducer";
import { IUser, Location, Name } from "../../interfaces/user/user-interface";
import Input from "../Input";
import { CustomButton } from "../CustomButton";

import "./styles.css";
import useForm from "../../Hooks/useForm";
import { userMapIUser } from "../../utils/userMapIUser";

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

type Props = {
  headerText?: string;
};

export type EditUser = {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  city: string;
  street: string;
};

export const CustomModal: FC<Props> = (props) => {
  const { headerText = "" } = props;

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
    if (isEmpty(errors) || !hasAllValues(values)) {
      alert("feilds are not ok");
      return;
    }

    const user = userMapIUser(values);
    dispatch(createUser({ ...user, image }));
    dispatch(unSetUser());
    resetForm({});
  };

  return (
    <Modal
      open={Boolean(user)}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <div style={wrapperStyle}>
        <Box className='wrapper_box'>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            {headerText}
          </Typography>
          <Typography sx={{ mt: 2 }}>Email</Typography>
          <Typography sx={{ mt: 2 }}>
            <Input
              label='Email'
              name='email'
              value={values.email}
              onChange={handleChange}
            />
          </Typography>
          <Typography sx={{ mt: 2 }}>Name</Typography>
          <Typography sx={{ mt: 2 }}>
            <Input
              label='Title'
              name='title'
              value={values.title}
              onChange={handleChange}
              error={!!errors.title}
              autoComplete='off'
            />
          </Typography>
          <Typography sx={{ mt: 2 }}>
            <Input
              label='First Name'
              name='firstName'
              value={values.firstName}
              onChange={handleChange}
              error={!!errors.firstName}
              autoComplete='off'
            />
          </Typography>
          <Typography sx={{ mt: 2 }}>
            <Input
              label='Last Name'
              name='lastName'
              value={values.lastName}
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
              value={values.country}
              onChange={handleChange}
              error={!!errors.country}
              autoComplete='off'
            />
          </Typography>
          <Typography sx={{ mt: 2 }}>
            <Input
              label='City'
              name='city'
              value={values.city}
              onChange={handleChange}
              error={!!errors.city}
              autoComplete='off'
            />
          </Typography>
          <Typography sx={{ mt: 2 }}>
            <Input
              label='Street'
              name='street'
              value={values.street}
              onChange={handleChange}
              error={!!errors.street}
              autoComplete='off'
            />
          </Typography>
          <div className='box-actions_wrapper'>
            <CustomButton {...{ ...props, onClick: handleClose }}>
              Cancel
            </CustomButton>
            <CustomButton {...{ ...props, onClick: handleSave }}>
              Save
            </CustomButton>
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
