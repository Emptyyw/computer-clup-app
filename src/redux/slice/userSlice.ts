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
  updateUserProfile,
  uploadFile,
  saveAvatarUrl,
  loadAvatarUrl,
  deleteAvatar,
} from 'api/db';
import { RootState } from 'store/store';

export interface AuthState {
  user: User;
  role: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
  isAuthenticated: boolean;
  token: string | null;
  avatarUrl?: string;
}

const initialState: AuthState = {
  user: {
    firstName: '',
    lastName: '',
    login: '',
    email: '',
    id: '',
    role: '',
    avatarUrl: '',
  },
  role: '',
  status: 'idle',
  error: '',
  isAuthenticated: false,
  token: null,
};

interface SaveUserAvatarArgs {
  userId: string;
  avatarUrl: string;
}

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

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (
    { user, firstName, lastName }: { user: User; firstName: string; lastName: string },
    thunkAPI,
  ) => {
    try {
      const updatedUser = await updateUserProfile(user, firstName, lastName);
      return updatedUser;
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

export const uploadAvatar = createAsyncThunk(
  'auth/uploadAvatar',
  async (file: File, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    try {
      const url = await uploadFile(file, state.user.id);
      return url;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const saveUserAvatar = createAsyncThunk(
  'user/saveAvatarUrl',
  async ({ userId, avatarUrl }: SaveUserAvatarArgs) => {
    await saveAvatarUrl(userId, avatarUrl);
    return avatarUrl;
  },
);

export const loadUserAvatar = createAsyncThunk(
  'user/loadAvatarUrl',
  async (userId: string) => {
    const avatarUrl = loadAvatarUrl(userId);
    return avatarUrl;
  },
);
export const deleteUserAvatar = createAsyncThunk(
  'user/deleteAvatar',
  async (avatarUrl: string) => {
    await deleteAvatar(avatarUrl);
    return avatarUrl;
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
          state.isAuthenticated = true;
        }
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = 'succeeded';
          state.user = action.payload;
          state.role = action.payload.role;
          state.isAuthenticated = true;
        }
      })
      .addCase(authGoogle.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = 'succeeded';
          state.user = action.payload;
          state.isAuthenticated = true;
        }
      });
    builder.addCase(updateLogin.fulfilled, (state, action) => {
      if (action.payload) {
        state.status = 'succeeded';
        state.user = action.payload;
      }
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      if (action.payload) {
        state.status = 'succeeded';
        state.user = action.payload;
      }
    });
    builder.addCase(uploadAvatar.fulfilled, (state, action) => {
      if (action.payload) {
        state.status = 'succeeded';
        state.user.avatarUrl = action.payload;
      }
    });
    builder.addCase(saveUserAvatar.fulfilled, (state, action) => {
      state.avatarUrl = action.payload;
    });
    builder.addCase(loadUserAvatar.fulfilled, (state, action) => {
      if (typeof action.payload === 'string') {
        state.user.avatarUrl = action.payload;
      }
    });
    builder.addCase(deleteUserAvatar.fulfilled, state => {
      state.user.avatarUrl = '';
    });
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
