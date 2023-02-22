import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGetUserResponse, IUser } from "store/types";

const initialState: IGetUserResponse = {
  users: undefined,
};

export const usersSlice = createSlice({
  initialState,
  name: "usersSlice",
  reducers: {
    setUsers: (state, action: PayloadAction<IUser>) => {
      state.users = action.payload;
    },
  },
});

export default usersSlice.reducer;

export const { setUsers } = usersSlice.actions;
