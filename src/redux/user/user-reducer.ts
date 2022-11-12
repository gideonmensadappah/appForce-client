import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces/user/user-interface";
import { get_users } from "./user-actions";

type InitialState = {
  loading: boolean;
  user: IUser | null;
  users: IUser[];
  error: string;
};

const initialState: InitialState = {
  loading: false,
  user: null,
  users: [] as IUser[],
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createUser(state, action: PayloadAction<IUser>) {
      const newUser = action.payload;
      state.users = [newUser, ...state.users];
    },
    unSetUser(state) {
      state.user = null;
    },
    setNewUser(state) {
      state.user = {} as IUser;
    },
    setUpdateUser(state, action: PayloadAction<string | null>) {
      const user_id = action.payload;
      const user = state.users.find(({ id }) => id === user_id);

      if (!user) {
        state.user = null;
        return;
      }

      state.user = user;
    },
    updateUser(state, action: PayloadAction<IUser>) {
      const updatedUser = action.payload;

      state.users = [
        ...state.users.map((user) => {
          const { id, ...rest } = user;
          if (id !== updatedUser.id) return user;

          return { ...rest, ...updatedUser };
        }),
      ];
    },

    deleteUser(state, action: PayloadAction<string>) {
      const user_id = action.payload;
      state.users = [...state.users.filter(({ id }) => id !== user_id)];
    },
  },
  extraReducers(builder) {
    builder.addCase(get_users.fulfilled, (state, action) => {
      state.users = action.payload.data;
      state.loading = false;
    });

    builder.addCase(get_users.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(get_users.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const {
  createUser,
  updateUser,
  deleteUser,
  setUpdateUser,
  setNewUser,
  unSetUser,
} = userSlice.actions;

export default userSlice.reducer;
