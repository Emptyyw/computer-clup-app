import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { handleRegister, saveUserToDb, authorizationUser } from 'api/db';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { authWithGoogle } from 'api/db';
export interface UserState {
  login: string;
  email: string;
  password: string;
  id?: string;
  role?: string;
  token: string;
  isAuthenticated?: boolean;
}
export interface UserResponse {
  login: string;
  email: string;
  token: string;
  id: string;
  isAuthenticated?: boolean;
}

const initialState: UserState = {
  login: '',
  email: '',
  password: '',
  token: '',
  id: '',
  role: undefined,
  isAuthenticated: undefined,
};

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ email, password, login }: UserState) => {
    const userCredential = await handleRegister(email, password);
    const user = {
      login,
      email,
      token: userCredential.user.refreshToken,
      id: userCredential.user.uid,
      password: '',
      role: '',
      isAuthenticated: true,
    };
    await saveUserToDb(user);
    return user;
  },
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: UserState, thunkAPI) => {
    try {
      const user = await authorizationUser(email, password);
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const signInWithGoogle = createAsyncThunk(
  'user/signInWithGoogle',
  async (_, thunkAPI) => {
    try {
      const result = await authWithGoogle();
      const user = {
        login: result.user.displayName,
        email: result.user.email,
        token: result.user.refreshToken,
        id: result.user.uid,
      };
      return user;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('An unknown error occurred');
    }
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(registerUser.fulfilled, (state, action: PayloadAction<UserState>) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.login = action.payload.login;
      state.token = action.payload.token;
      state.id = action.payload.id;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload.email !== null) {
        state.email = action.payload.email;
      }
      state.token = action.payload.token;
      state.isAuthenticated = true;
    });
    builder.addCase(signInWithGoogle.fulfilled, (state, action) => {
      if (action.payload.email !== null) {
        state.email = action.payload.email;
      }
      state.token = action.payload.token;
      if (action.payload.login !== null) {
        state.login = action.payload.login;
      }
      state.id = action.payload.id;
      state.isAuthenticated = true;
    });
  },
});

export default userSlice.reducer;
