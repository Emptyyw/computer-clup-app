import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth, db, realtimeDb, storage } from 'firebase/firebase';
import 'firebase/firestore';
import { saveUserToDb } from './setDoc';
import { ref as dbRef, set } from 'firebase/database';
import {
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  setDoc,
  updateDoc,
} from '@firebase/firestore';

export interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  phoneNum?: number;
  login: string;
  email: string;
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

export enum FireBaseCollection {
  Profile = 'profile',
}

export const getFirestoreDataById = async <T extends DocumentData>(
  path: FireBaseCollection,
  id: string,
): Promise<T | null> => {

  const docRef = doc(db, path, id) as DocumentReference<T>;
  const snapshot = await getDoc(docRef);

  if (snapshot.exists()) {
    return snapshot.data();
  }

  return null;
}

export const setFirestoreDataById = async<T extends DocumentData>(
  path: FireBaseCollection,
  id: string,
  data: T
): Promise<DocumentReference<T>> => {
  const docRef = doc(db, path, id) as DocumentReference<T>;
  await setDoc(docRef, data);
  return docRef;
}

export const updateFirestoreDataById = async<T extends DocumentData>(
  path: FireBaseCollection,
  id: string,
  data: DocumentData,
): Promise<DocumentReference<T>> => {
  const docRef = doc(db, path, id) as DocumentReference<T>;
  await updateDoc(docRef, data);
  return docRef;
}

export const deleteFirestoreDataById = async<T extends DocumentData>(
  path: FireBaseCollection,
  id: string,
): Promise<DocumentReference<T>> => {
  const docRef = doc(db, path, id) as DocumentReference<T>;
  await deleteDoc(docRef);
  return docRef;
}
