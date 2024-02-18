import { doc, setDoc } from 'firebase/firestore';
import { db } from 'firebase/firebase';
import { User } from 'api/db';
import { UserCredential } from 'firebase/auth';

export function getFirestore() {
  return db;
}

export async function saveUserToDb(
  userCredential: UserCredential,
  login: string,
  role: string,
) {
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
    throw new Error('User saving failed');
  }
}
