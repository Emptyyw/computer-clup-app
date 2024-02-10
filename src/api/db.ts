import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth, signIn } from 'firebase/firebase';
import 'firebase/firestore';

interface User {
  login: string;
  email: string;
  token: string;
  id: string;
}

export async function saveUserToDb(user: User) {
  const db = getFirestore();
  const userDoc = doc(db, 'users', user.id);
  await setDoc(userDoc, {
    login: user.login,
    email: user.email,
    token: user.token,
  });
}

export async function handleRegister(email: string, password: string) {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password);
}

export const authorizationUser = async (email: string, password: string) => {
  try {
    const userCredential = await signIn(auth, email, password);
    const token = await userCredential.user.getIdToken();
    const userWithToken = {
      ...userCredential.user,
      token,
    };
    return userWithToken;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const authWithGoogle = async () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result;
};
export const getUserDoc = async (userId: string) => {
  const db = getFirestore();
  const userDoc = doc(db, 'users', userId);
  return await getDoc(userDoc);
};

export const saveUserLogin = async (userId: string, login: string) => {
  const db = getFirestore();
  const userDoc = doc(db, 'users', userId);
  return await setDoc(
    userDoc,
    {
      customLogin: login,
    },
    { merge: true },
  );
};
