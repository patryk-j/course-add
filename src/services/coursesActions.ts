import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export const getCourseById = async (courseId: string) => {
  const document = await getDoc(doc(db, "courses", courseId));
  return document.exists()
    ? document.data()
    : Promise.reject(Error(`No such document`));
};

export const getLessonById = async (courseId: string, lessonId: string) => {
  const document = await getDoc(doc(db, "courses", courseId));
  if (document.exists()) {
    return await document.data().lessons[+lessonId];
  }
};
