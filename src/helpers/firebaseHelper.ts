import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

type WishlistItem = {
  createdAt: Timestamp;
  id: string;
  listId: string;
  name: string;
  price: number;
  priority: number;
  purchaseStatus: string;
  url: string;
};
export const validateForm = () => {};

export const createDefaultWishlist = async (ownerId: string) => {
  const wishList = query(
    collection(db, "wishlists"),
    where("ownerId", "==", ownerId),
    where("isDefault", "==", true),
    limit(1),
  );

  const snapshot = await getDocs(wishList);

  if (!snapshot.empty) {
    return snapshot.docs[0].id;
  }

  const docRef = await addDoc(collection(db, "wishlists"), {
    ownerId,
    title: "My Wishlist",
    isDefault: true,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
};

//get all
export const getAllWishLists = async (ownerId: string) => {
  const wishList = query(
    collection(db, "wishlists"),
    where("ownerId", "==", ownerId),
  );

  const snapshot = await getDocs(wishList);
  if (snapshot.empty) {
    return [];
  }

  const result = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return result;
};

// get items by wishlist id
export const getWishlistItems = async (listId: string) => {
  console.log("listId", listId);
  const items = query(
    collection(db, "wishlistItems"),
    where("listId", "==", listId),
  );

  const snapshot = await getDocs(items);

  if (snapshot.empty) {
    return [];
  }
  return snapshot.docs.map((doc) => {
    // Tell TypeScript this data matches the WishlistItem shape except for `id`.
    // The Firebase document ID comes from `doc.id`.
    const data = doc.data() as Omit<WishlistItem, "id">;
    return {
      ...data,
      createdAt: doc.data().createdAt?.seconds,
      id: doc.id,
    };
  });
};

export const getItemById = async (
  itemId: string,
): Promise<WishlistItem | null> => {
  const item = doc(db, "wishlistItems", itemId);
  const snapshot = await getDoc(item);

  // if (snapshot.empty) {
  //   return [];
  // }
  console.log("snapshot", snapshot.data());
  const data = snapshot.data() as Omit<WishlistItem, "id">;

  return {
    ...data,
    createdAt: data.createdAt,
    id: snapshot.id,
  };
};
