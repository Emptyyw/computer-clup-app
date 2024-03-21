import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
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
import { auth, db, storage } from 'firebase/firebase';
import 'firebase/firestore';
import { saveUserToDb } from './setDoc';
import { CollectionPaths } from 'Enum/Enum';

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
  try {
    const storageRef = ref(storage, `AvatarProfile/${userId}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    await uploadTask;

    const url = await getDownloadURL(storageRef);

    const userDocRef = doc(db, 'users', user.id);
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

export const deleteAvatar = async (avatarUrl: string) => {
  const avatarRef = ref(storage, 'AvatarProfile/' + avatarUrl);
  deleteObject(avatarRef);
};

export function firebaseLogout() {
  return signOut(auth);
}

export const searchFirestoreDbByField = async <T extends DocumentData>(
  path: CollectionPaths,
  field: keyof T,
  searchQuery: string,
  limitCollection: number = 10,
): Promise<T[] | null> => {
  const collectionRef = collection(db, path);

  const querySnapshot = await getDocs(
    query(
      collectionRef,
      where(field.toString(), '>=', searchQuery),
      where(field.toString(), '<=', searchQuery + '\uf8ff'),
      orderBy(field.toString()),
      limit(limitCollection),
    ),
  );

  if (querySnapshot.empty) {
    return [];
  }

  const docData: T[] = [];

  querySnapshot.forEach(docSnapshot => {
    const data = docSnapshot.data() as T;
    docData.push(data);
  });

  return docData;
};
