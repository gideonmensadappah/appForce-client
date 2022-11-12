import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const userStateSelector = (state: RootState) => state.user;

export const currentUserSelector = createSelector(
  userStateSelector,
  (state) => state.user
);
export const usersSelctor = createSelector(
  userStateSelector,
  (state) => state.users
);

export const messageSelector = createSelector(
  userStateSelector,
  (state) => state.message
);

export const radmonImageSelctor = createSelector(userStateSelector, (state) => {
  const randomIndex = Math.floor(Math.random() * state.users?.length!);
  if (state.users[randomIndex]) {
    return state.users[randomIndex]?.image;
  }
  return {
    medium: "",
  };
});
