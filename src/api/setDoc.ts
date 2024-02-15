import { doc, setDoc } from 'firebase/firestore';
import { db } from 'firebase/firebase';
import { User } from 'api/db';

interface UserCredential {
  uid: string;
  email: string | null;
  login: string;
}
export function getFirestore() {
  return db;
}

export async function saveUserToDb(user: UserCredential, userData: User) {
  const userDocRef = doc(db, 'users', user.uid);
  await setDoc(userDocRef, userData);
}

export function createUserData(user: UserCredential, login: string): User {
  const userData: User = {
    login,
    email: user.email || '',
    id: user.uid,
    role: 'user',
  };

  return userData;
}
