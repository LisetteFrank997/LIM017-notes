
import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCKhMVsde7p8-STBe_sEW8D6W8EeGCmAq8",
  authDomain: "lab-notes-7947f.firebaseapp.com",
  projectId: "lab-notes-7947f",
  storageBucket: "lab-notes-7947f.appspot.com",
  messagingSenderId: "777013180943",
  appId: "1:777013180943:web:f989789bc07aa91675417a",
  measurementId: "G-8XZZFN034J"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const updateNote = async (id, description) => {
  
  await updateDoc(doc(db, 'notes', id), {description:description})
}