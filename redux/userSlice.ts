import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface currentUser{
  current_user: {
    avatar: string,
    averageScore: number,
    bio: string,
    blogs: {
      _id: string,
    }[]
    createdAt: string,
    name: string,
    updatedAt: string,
    username: string,
    _id: string,
  } | null
}

const initialState: currentUser = {
  current_user: null,
}

export const userSlice = createSlice({
  name: "current_user",
  initialState,
  reducers: {
    setCurrent_user: (state, action: PayloadAction<currentUser>) => {
      state.current_user = action.payload ;
    }
  }
});

export const { setCurrent_user } = userSlice.actions;
export default userSlice.reducer;