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
    setUserInfo: (state: { info: any }, actions: { payload: any }) => {
      state.info = actions.payload;
    },
    removeUserInfo: (state: {
      info: {
        active: boolean;
        email: string;
        roles: never[];
        username: string;
      };
    }) => {
      state.info = { active: false, email: "", roles: [], username: "" };
    },
  },
});

export const { setUserInfo, removeUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;
export const selectUserInfo = (state: { userInfo: { info: any } }) =>
  state.userInfo.info;
