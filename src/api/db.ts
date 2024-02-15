import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { db, auth } from 'firebase/firebase';
import 'firebase/firestore';

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
  const user = userCredential.user;

  if (user) {
    const userData: User = {
      login,
      email: user.email || '',
      id: user.uid,
      role,
    };

    const userDocRef = doc(db, 'users', user.uid);
    await setDoc(userDocRef, userData);

    return userData;
  } else {
    throw new Error('User registration failed');
  }
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
  const user = userCredential.user;

  if (user) {
    const userDocRef = doc(db, 'users', user.uid);
    const docSnapshot = await getDoc(userDocRef);

    if (docSnapshot.exists()) {
      return docSnapshot.data() as User;
    } else {
      const userData: User = {
        login,
        email: user.email || '',
        id: user.uid,
        role: 'user',
      };

      await setDoc(userDocRef, userData);
      return userData;
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

export function logout() {
  return signOut(auth);
}
