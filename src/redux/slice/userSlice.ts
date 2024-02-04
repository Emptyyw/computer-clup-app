import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  login: string | null;
  email: string | null;
  token: string | null;
  id: string | null;
  role?: string;
  isAuthenticated?: boolean;
}

const initialState: UserState = {
  login: null,
  email: null,
  token: null,
  id: null,
  role: undefined,
  isAuthenticated: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.login = action.payload.login;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.isAuthenticated = !!action.payload.token;
    },
    setRole(state, action: PayloadAction<string>) {
      state.role = action.payload;
    },
    setAdminRole(state, action: PayloadAction<string>) {
      state.role = action.payload;
    },
    removeUser(state) {
      state.login = null;
      state.email = null;
      state.token = null;
      state.id = null;
      state.isAuthenticated = false;
    },
    setLogin(state, action: PayloadAction<string>) {
      state.login = action.payload;
    },
  },
});

export const { setRole, setAdminRole, setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
