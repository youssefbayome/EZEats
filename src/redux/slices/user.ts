import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";

interface UserState {
  phoneNumber: string | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  phoneNumber: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.phoneNumber = null;
      state.isAuthenticated = false;
    },
  },
});

const persistConfig = {
  key: "user",
  storage: AsyncStorage,
};

export const { login, logout } = userSlice.actions;
export default persistReducer(persistConfig, userSlice.reducer);
