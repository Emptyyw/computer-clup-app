import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  SerializedError,
} from '@reduxjs/toolkit';
import { User, registerUser, loginUser, signInWithGoogle, updateUserLogin } from 'api/db';

export interface AuthState {
  user: User;
  role: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
}

const initialState: AuthState = {
  user: {
    login: '',
    email: '',
    id: '',
    role: '',
  },
  status: 'idle',
  error: '',
  role: '',
};

export const register = createAsyncThunk('auth/register', registerUser);
export const login = createAsyncThunk('auth/login', loginUser);

export const authGoogle = createAsyncThunk<User | undefined, string>(
  'user/authGoogle',
  async (login, thunkAPI) => {
    try {
      const user = await signInWithGoogle(login);
      return user;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const updateLogin = createAsyncThunk(
  'auth/updateLogin',
  async ({ user, newLogin }: { user: User; newLogin: string }, thunkAPI) => {
    try {
      const updatedUser = await updateUserLogin(user, newLogin);
      return updatedUser;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.role = action.payload.role;
      })
      .addCase(authGoogle.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload || state.user;
      });
    builder
      .addCase(updateLogin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addMatcher(
        action => action.type.endsWith('/pending'),
        state => {
          state.status = 'loading';
        },
      )
      .addMatcher(
        action => action.type.endsWith('/rejected'),
        (state, action: PayloadAction<SerializedError>) => {
          state.status = 'failed';
          if (action.payload) {
            state.error = action.payload.message;
          }
        },
      );
  },
});

export default authSlice.reducer;
