
import { initializeApp } from "firebase/app";
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAzx6lqn_DqycvVwA6VvKRP07JaoN80bc",
  authDomain: "new-project-a02a0.firebaseapp.com",
  projectId: "new-project-a02a0",
  storageBucket: "new-project-a02a0.firebasestorage.app",
  messagingSenderId: "977728731932",
  appId: "1:977728731932:web:7f673d0860c5d937b398d9",
  measurementId: "G-BBRJWG6D1Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, {
    localCache: persistentLocalCache({
        tabManager: persistentMultipleTabManager()
    }),
});


export { db };

