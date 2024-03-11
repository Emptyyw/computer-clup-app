import { doc, getDoc, updateDoc } from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { db, auth, storage, realtimeDb } from 'firebase/firebase';
import 'firebase/firestore';
import { saveUserToDb } from './setDoc';
import { ref as dbRef, set } from 'firebase/database';

export interface User {
  firstName?: string;
  lastName?: string;
  phoneNum?: number;
  login: string;
  email: string;
  id: string;
  role: string;
  avatarUrl?: string;
}
interface RegisterUserParams {
  firstName: string;
  lastName: string;
  phoneNum: number;
  email: string;
  password: string;
  login: string;
  role: string;
}

interface LoginUserParams {
  email: string;
  password: string;
}

export function getFirestore() {
  return db;
}

export async function registerUser({
  email,
  password,
  login,
  role,
  firstName,
  lastName,
}: RegisterUserParams) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);

  return saveUserToDb(userCredential, login, role, firstName, lastName);
}

export async function loginUser({ email, password }: LoginUserParams) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  if (user) {
    const userDocRef = doc(db, 'users', user.uid);
    const docSnapshot = await getDoc(userDocRef);

    if (docSnapshot.exists()) {
      return docSnapshot.data() as User;
    } else {
      throw new Error('User does not exist in Firestore');
    }
  } else {
    throw new Error('Email and password auth failed');
  }
}

export async function signInWithGoogle(login: string) {
  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);

  if (userCredential.user) {
    const userDocRef = doc(db, 'users', userCredential.user.uid);
    const docSnapshot = await getDoc(userDocRef);

    if (docSnapshot.exists()) {
      return docSnapshot.data() as User;
    } else {
      return saveUserToDb(userCredential, login, 'user');
    }
  } else {
    throw new Error('Google auth failed');
  }
}

export async function updateUserLogin(user: User, newLogin: string) {
  const userDocRef = doc(db, 'users', user.id);
  await updateDoc(userDocRef, { login: newLogin });

  const updatedUser = { ...user, login: newLogin };
  return updatedUser;
}

export async function updateUserProfile(user: User, firstName: string, lastName: string) {
  const userDocRef = doc(db, 'users', user.id);
  await updateDoc(userDocRef, {
    lastName: lastName,
    firstName: firstName,
  });

  const updatedUser = { ...user, lastName, firstName };
  return updatedUser;
}

export async function uploadFile(user: User, file: File, userId: string) {
  const userDocRef = doc(db, 'users', user.id);

  try {
    const storageRef = ref(storage, `AvatarProfile/${userId}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    await uploadTask;
    const url = await getDownloadURL(storageRef);
    await updateDoc(userDocRef, {
      avatarUrl: url,
    });
    const updatedUser = { ...user, avatarUrl: url };

    return updatedUser;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

export async function saveAvatarUrl(userId: string, avatarUrl: string) {
  try {
    await set(dbRef(realtimeDb, 'users/' + userId), {
      avatarUrl: avatarUrl,
    });
  } catch (error) {
    console.error('Error saving avatar URL:', error);
    throw error;
  }
}

export const deleteAvatar = async (avatarUrl: string) => {
  const avatarRef = ref(storage, 'AvatarProfile/' + avatarUrl);
  deleteObject(avatarRef);
};

export function firebaseLogout() {
  return signOut(auth);
}
