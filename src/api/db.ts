import { doc, getDoc, updateDoc } from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { db, auth } from 'firebase/firebase';
import 'firebase/firestore';
import { saveUserToDb } from './setDoc';

export interface User {
  login: string;
  email: string;
  id: string;
  role: string;
}
interface RegisterUserParams {
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

export async function registerUser({ email, password, login, role }: RegisterUserParams) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);

  return saveUserToDb(userCredential, login, role);
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

export function firebaseLogout() {
  return signOut(auth);
}
