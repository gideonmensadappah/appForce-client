import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { get_users } from "../../redux/user/user-actions";
import UserCard from "../../components/UserCard/index";
import { usersSelctor } from "../../redux/user/user-selector";
import "./styles.css";
import CustomModal from "../../components/CustomModal/index";
import CreateUser from "../../components/CreateUser/index";
import TopSection from "../../components/TopSection/index";
import { IUser } from "../../interfaces/user/user-interface";
import { searchMatch } from "../../utils/searchMatch";

const Main = () => {
  const users = useSelector(usersSelctor);
  const dispatch = useDispatch<AppDispatch>();
  const [userText, setUserText] = useState("");

  useEffect(() => {
    if (users.length) return;

    dispatch(get_users({ amountOfResult: 10 }));
  }, [users.length]);

  const handleUserTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: newText } = e.target;
    setUserText((prev) => newText);
  };

  const fillteredUsers = useMemo(() => {
    let searchResults = [] as Array<IUser>;

    if (userText.trim().length) {
      return (searchResults = searchMatch([...users], userText));
    }

    return (searchResults = users);
  }, [users, userText]);

  return (
    <div className='main-wrapper'>
      <TopSection handleUserTextChange={handleUserTextChange} />
      <div className='main-wrapper_users'>
        {fillteredUsers.map((user) => (
          <UserCard {...user} key={user.id} />
        ))}
      </div>
      <CustomModal />
      <CreateUser />
    </div>
  );
};

export default Main;
