import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

import userInfoReducer from "./userInfo";
import { persistReducer } from "redux-persist";

// 여러개의 리듀서를 하나로 합친 최종 리듀서
// 각 상태 조각을 담당하는 리듀서를 키로 묶는다.
const reducers = combineReducers({
  userInfo: userInfoReducer,
});

// 저장소 설정 객체
// key 값이 root인 storage 생성된다.
const persistConfig = {
  key: "root",
  storage,
};

// reducers를 감싸는 persist(저장 가능) 리듀서로 만든다.
const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
