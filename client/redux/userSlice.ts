import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  userData: object | null;
}

const initialState: UserState = {
  userData: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
        state.userData = action.payload;
    },
    clearUserData: (state) => {
        state.userData = null;
    }
  },
});

export const { setUserData, clearUserData } = userSlice.actions;

export default userSlice.reducer;