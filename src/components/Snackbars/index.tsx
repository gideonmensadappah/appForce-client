import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { messageSelector } from "../../redux/user/user-selector";
import { AppDispatch } from "../../redux/store";
import { MessageType, removeMessage } from "../../redux/user/user-reducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const CustomizedSnackbars = () => {
  const { type, message } = useSelector(messageSelector);

  const dispatch = useDispatch<AppDispatch>();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    dispatch(removeMessage());
    if (reason === "clickaway") {
      dispatch(removeMessage());
      return;
    }
  };
  if (!type) {
    return null;
  }

  const isSuccess = type === MessageType.SUCCESS;
  return (
    <Stack spacing={2} sx={{ width: "50%", alignSelf: "center" }}>
      <Snackbar open={!!type} autoHideDuration={5000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={isSuccess ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default CustomizedSnackbars;
