import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCGzkpqvEM1WHYsegv5kE3I-fYfwm6K3sY",
  authDomain: "se2-project-8a779.firebaseapp.com",
  projectId: "se2-project-8a779",
  storageBucket: "se2-project-8a779.appspot.com",
  messagingSenderId: "941499991557",
  appId: "1:941499991557:web:35d29742d6d22460f87e6c",
  measurementId: "G-FR3WP55KXR"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider() 
export const db = getFirestore(app);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);