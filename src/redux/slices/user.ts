import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";
import { removeUserData, saveUserData } from "@/src/lib/helpers";

interface UserState {
  phoneNumber: string | null;
  isAuthenticated: boolean;
  userName: string | null;
}

const initialState: UserState = {
  phoneNumber: null,
  isAuthenticated: false,
  userName: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
      state.isAuthenticated = true;
      state.userName = "Waiter name";
      saveUserData({ phoneNumber: action.payload, userName: state.userName });
    },
    logout: (state) => {
      state.phoneNumber = null;
      state.isAuthenticated = false;
      state.userName = null;
      removeUserData();
    },
  },
});

const persistConfig = {
  key: "user",
  storage: AsyncStorage,
};

export const { login, logout } = userSlice.actions;
export default persistReducer(persistConfig, userSlice.reducer);
