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
  uploadFile,
  deleteAvatar,
  getListUsers,
  searchFirestoreDbByField,
  updateUserById,
  getFirestoreUserById,
} from 'api/db';
import { RootState } from 'store/store';
import { CollectionPaths } from 'Enum/Enum.ts';
import { modals } from '@mantine/modals';

export interface AuthState {
  user: User;
  searchUser: User;
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
  searchUser: {
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

export interface IProfileUpdateById {
  updates: {
    firstName: string;
    lastName: string;
    role?: string;
    login?: string;
    phoneNum?: string;
  };
  userId: string;
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
  phoneNum?: string;
  login: string;
  email: string;
  role: string;
}

type IListUsers = User[];

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
      const url = await uploadFile(state.user, file, state.user.id);
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

export const getUsers = createAsyncThunk<IListUsers>('user/listUser', async () => {
  const userList = await getListUsers();
  return userList;
});

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

export const updateUser = createAsyncThunk(
  'user/updateByIdProfile',
  async ({ userId, updates }: IProfileUpdateById, thunkAPI) => {
    try {
      const updatedUser = await updateUserById(userId, updates);
      thunkAPI.dispatch(getUsers());
      modals.closeAll();
      return updatedUser;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
export const getUserById = createAsyncThunk<User, string | void>(
  'auth/getUserById',
  async (id, thunkAPI) => {
    if (!id) {
      throw new Error('User ID is missing');
    }
    try {
      const getUser = await getFirestoreUserById(id);
      if (getUser === null) {
        throw new Error('User not found');
      }

      return getUser;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
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

      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.searchUserResults = action.payload;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.searchUser = action.payload;
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload) {
          const updatedUser = action.payload;
          if (updatedUser.id === state.user.id) {
            state.user.role = updatedUser.role;
            state.user.login = updatedUser.login;
            state.user.firstName = updatedUser.firstName;
            state.user.lastName = updatedUser.lastName;
            state.user.phoneNum = updatedUser.phoneNum;
          }
        }
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
