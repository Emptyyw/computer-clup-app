import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  setDoc,
  writeBatch,
  DocumentData,
  DocumentReference,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db, storage } from 'firebase/firebase';
import { CollectionPaths } from 'Enum/Enum';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { IUpdateProduct } from 'redux/slice/shop/shopSlice';

export const createCategoryAndProductById = async <T extends DocumentData>(
  path: CollectionPaths,
  id: string,
  data: T,
) => {
  const docRef = doc(db, path, id) as DocumentReference<T>;

  await setDoc(docRef, data);

  return data;
};

export const getCategories = async <
  T extends DocumentData & { id: string; name: string },
>(
  path: CollectionPaths,
): Promise<T[]> => {
  const categoriesRef = collection(db, path);

  const categorySnapshot = await getDocs(categoriesRef);

  const categoryList: T[] = [];

  categorySnapshot.forEach(doc => {
    categoryList.push(doc.data() as T);
  });

  return categoryList;
};

export const getProductsByCategoryId = async <T extends DocumentData>(
  path: CollectionPaths,
  field: keyof T,
  categoryId: string,
  limitCollection: number = 10,
): Promise<T[] | null> => {
  const productsRef = collection(db, path);

  const productsSnapshot = await getDocs(
    query(
      productsRef,
      where(field.toString(), '==', categoryId),
      orderBy(field.toString()),
      limit(limitCollection),
    ),
  );

  if (productsSnapshot.empty) {
    return [];
  }

  const docData: T[] = [];

  productsSnapshot.forEach(docSnapshot => {
    const data = docSnapshot.data() as T;
    docData.push(data);
  });

  return docData;
};

export const updateCategoryAndProductById = async <T extends DocumentData>(
  path: CollectionPaths,
  id: string,
  data: DocumentData,
): Promise<DocumentReference<T>> => {
  const docRef = doc(db, path, id) as DocumentReference<T>;

  await updateDoc(docRef, data);

  return docRef;
};

export const uploadImageToFirebase = async (imageFile: File, product: IUpdateProduct) => {
  const imageRef = ref(storage, `shopImages/${product.id}`);

  const uploadTask = uploadBytesResumable(imageRef, imageFile);

  await uploadTask;

  const imageUrl = await getDownloadURL(imageRef);

  return imageUrl;
};

export const deleteImageToFirebase = async (imageUrl: string) => {
  const desertRef = ref(storage, imageUrl);

  await deleteObject(desertRef);
};

export const deleteCategoryAndProduct = async (path: CollectionPaths, id: string) => {
  const docRef = doc(db, path, id);

  await deleteDoc(docRef);

  return docRef;
};

export const deleteCategoryAndAllProducts = async (
  path: CollectionPaths,
  categoryId: string,
) => {
  const productsRef = collection(db, path);

  const querySnapshot = await getDocs(
    query(productsRef, where('categoryId', '==', categoryId)),
  );

  const batch = writeBatch(db);

  querySnapshot.forEach(document => {
    batch.delete(document.ref);
  });

  await batch.commit();

  const docRef = doc(db, CollectionPaths.CATEGORIES, categoryId);

  await deleteDoc(docRef);

  return docRef;
};
