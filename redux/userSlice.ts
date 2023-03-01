import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface currentUser {
  current_user: {
    avatar: string;
    averageScore: number;
    bio: string;
    blogs: {
      _id: string;
    }[];
    createdAt: string;
    name: string;
    updatedAt: string;
    username: string;
    _id: string;
  } | null;
  flag: boolean
}

const initialState: currentUser = {
  current_user: null,
  flag: false
};

export const userSlice = createSlice({
  name: "current_user",
  initialState,
  reducers: {
    setCurrent_user: (state, action: PayloadAction<currentUser>) => {
      state.current_user = action.payload;
    },
    setFlag: (state, action) => {
      state.flag = action.payload;
    },
  },
});

export const { setCurrent_user, setFlag } = userSlice.actions;
export default userSlice.reducer;
