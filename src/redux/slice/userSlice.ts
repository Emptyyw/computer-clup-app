import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  SerializedError,
} from '@reduxjs/toolkit';
import {
  User,
  registerUser,
  loginUser,
  signInWithGoogle,
  updateUserLogin,
  firebaseLogout,
} from 'api/db';

export interface AuthState {
  user: User;
  role: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
  isAuthenticated: boolean;
  token: string | null;
}

const initialState: AuthState = {
  user: {
    login: '',
    email: '',
    id: '',
    role: '',
  },
  role: '',
  status: 'idle',
  error: '',
  isAuthenticated: false,
  token: null,
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
export const logout = createAsyncThunk('user/logout', async () => {
  await firebaseLogout();
  return {};
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = 'succeeded';
          state.user = action.payload;
        }
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = 'succeeded';
          state.user = action.payload;
          state.role = action.payload.role;
        }
      })
      .addCase(authGoogle.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = 'succeeded';
          state.user = action.payload;
        }
      });
    builder.addCase(updateLogin.fulfilled, (state, action) => {
      if (action.payload) {
        state.status = 'succeeded';
        state.user = action.payload;
      }
    });
    builder;
    builder
      .addCase(logout.fulfilled, state => {
        state.isAuthenticated = false;
        state.token = null;
        state.user = {
          login: '',
          email: '',
          id: '',
          role: '',
        };
        state.role = '';
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
