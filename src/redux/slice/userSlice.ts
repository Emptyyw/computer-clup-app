import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  isAllOf,
  isPending,
  isRejected,
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
  deleteAvatar,
  searchFirestoreDbByField,
} from 'api/db';
import { RootState } from 'store/store';
import { CollectionPaths } from 'Enum/Enum';

export interface AuthState {
  user: User;
  searchUserResults: User[];
  role: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
  isAuthenticated: boolean;
  token: string | null;
  avatarUrl?: string;
}

const initialState: AuthState = {
  user: {
    id: '',
    firstName: '',
    lastName: '',
    login: '',
    email: '',
    role: '',
    avatarUrl: '',
  },
  searchUserResults: [],
  role: '',
  status: 'idle',
  error: '',
  isAuthenticated: false,
  token: null,
};

interface IProfileUpdate {
  user: User;
  firstName: string;
  lastName: string;
}

interface IUpdateLogin {
  user: User;
  newLogin: string;
}

interface IUserAvatarUploadResponse {
  avatarUrl?: string | undefined;
  id: string;
  firstName?: string;
  lastName?: string;
  phoneNum?: number;
  login: string;
  email: string;
  role: string;
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

export const updateProfile = createAsyncThunk<User, IProfileUpdate>(
  'auth/updateProfile',
  async ({ user, firstName, lastName }: IProfileUpdate, thunkAPI) => {
    try {
      const updatedUser = await updateUserProfile(user, firstName, lastName);
      return updatedUser;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const updateLogin = createAsyncThunk<User, IUpdateLogin>(
  'auth/updateLogin',
  async ({ user, newLogin }: IUpdateLogin, thunkAPI) => {
    try {
      const updatedUser = await updateUserLogin(user, newLogin);
      return updatedUser;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const uploadAvatar = createAsyncThunk<string | IUserAvatarUploadResponse, File>(
  'auth/uploadAvatar',
  async (file: File, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    try {
      const url = await uploadFile(state.user.user, file, state.user.user.id);
      return url;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const deleteUserAvatar = createAsyncThunk<string, string>(
  'user/deleteAvatar',
  async (avatarUrl: string) => {
    await deleteAvatar(avatarUrl);
    return avatarUrl;
  },
);

export const logout = createAsyncThunk<string, void>('user/logout', async () => {
  await firebaseLogout();
  return '{}';
});

export const searchUsersAsync = createAsyncThunk<User[] | null, string>(
  'users/search',
  async (searchQuery, thunkAPI) => {
    try {
      const users = await searchFirestoreDbByField<User>(
        CollectionPaths.USERS,
        'login',
        searchQuery,
      );

      return users;
    } catch (error) {
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
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = 'succeeded';
          state.user = action.payload;
          state.role = action.payload.role;
          state.isAuthenticated = true;
        }
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        if (action.payload) {
          const avatarUrl =
            typeof action.payload === 'string'
              ? action.payload
              : action.payload.avatarUrl;
          state.user.avatarUrl = avatarUrl;
          state.status = 'succeeded';
        }
      })
      .addCase(deleteUserAvatar.fulfilled, state => {
        state.user.avatarUrl = '';
        state.isAuthenticated = true;
      })
      .addCase(logout.fulfilled, state => {
        state.status = 'succeeded';
        state.user = {
          login: '',
          id: '',
          email: '',
          role: '',
        };
      })
      .addCase(searchUsersAsync.fulfilled, (state, action) => {
        state.searchUserResults = action.payload || [];
        state.status = 'succeeded';
      })
      .addMatcher(
        isAllOf(
          authGoogle.fulfilled,
          updateLogin.fulfilled,
          updateProfile.fulfilled,
          register.fulfilled,
          logout.fulfilled,
          searchUsersAsync.fulfilled,
        ),
        (state, action: PayloadAction<User>) => {
          if (action.payload) {
            state.status = 'succeeded';
            state.user = action.payload;
            state.isAuthenticated = true;
          }
        },
      )
      .addMatcher(isPending, state => {
        state.status = 'loading';
      })

      .addMatcher(isRejected, state => {
        state.status = 'failed';
      });
  },
});

export default authSlice.reducer;
