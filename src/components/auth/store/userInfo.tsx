import { createSlice } from "@reduxjs/toolkit";

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: {
    info: {
      active: false,
      email: "",
      roles: [],
      username: "",
    },
  },
  reducers: {
    setUserInfo: (state, actions) => {
      state.info = actions.payload;
    },
    removeUserInfo: (state) => {
      state.info = { active: false, email: "", roles: [], username: "" };
    },
  },
});

export const { setUserInfo, removeUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;
export const selectUserInfo = (state: { userInfo: { info: any } }) =>
  state.userInfo.info;
