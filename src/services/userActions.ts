import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export const getUserById = async (uid: string) => {
  const document = await getDoc(doc(db, "users", uid));
  return document.exists()
    ? document.data()
    : Promise.reject(Error(`No such document`));
};
