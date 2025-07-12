import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyBRKj7yeeNocStt4I8BzIXp-HwterMKao4",
    authDomain: "db-acessorios.firebaseapp.com",
    projectId: "db-acessorios",
    storageBucket: "db-acessorios.firebasestorage.app",
    messagingSenderId: "672681573022",
    appId: "1:672681573022:web:3fa5978ce7a47ea3b4998f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const auth = getAuth(app);
export const providerGoogle = new GoogleAuthProvider();