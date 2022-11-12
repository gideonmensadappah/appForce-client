import { FC } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { IUser } from "../../interfaces/user/user-interface";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { deleteUser, setUpdateUser } from "../../redux/user/user-reducer";
import { CustomButton } from "../CustomButton";
const CONFIRM_MESSAGE = "are you sure you want to delete?";
export const UserCard: FC<IUser> = (props) => {
  const { id, image, name } = props;
  const { medium } = image;
  const { title, first, last } = name;

  const dispatch = useDispatch<AppDispatch>();

  const handleEditClick = () => dispatch(setUpdateUser(id));
  const handleDeleteClick = () => {
    const response = window.confirm(CONFIRM_MESSAGE);

    if (!response) return;

    dispatch(deleteUser(id));
  };

  return (
    <Card style={{ marginBottom: "5%" }}>
      <CardMedia
        component='img'
        alt='green iguana'
        height='140'
        image={medium}
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {title} {first} {last}
        </Typography>
      </CardContent>
      <CardActions>
        <CustomButton size='small' onClick={handleEditClick}>
          Edit
        </CustomButton>
        <CustomButton size='small' onClick={handleDeleteClick}>
          Delete
        </CustomButton>
      </CardActions>
    </Card>
  );
};

export default UserCard;
