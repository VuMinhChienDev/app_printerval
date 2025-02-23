import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDMtANsWIClGMh5LY5Kz6WYQ8ExvC11D8o",
  authDomain: "react-native-a1690.firebaseapp.com",
  projectId: "react-native-a1690",
  storageBucket: "react-native-a1690.firebasestorage.app",
  messagingSenderId: "650451624205",
  appId: "1:650451624205:web:6764caa6aa3d9d42b25044"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };