
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCk0Dt8fHluM6Ht_Ui79upBwGN4hyGHx1E",
  authDomain: "zapmart-d31ee.firebaseapp.com",
  projectId: "zapmart-d31ee",
  storageBucket: "zapmart-d31ee.appspot.com",
  messagingSenderId: "793628645013",
  appId: "1:793628645013:web:308608680ab4ec9128ed9c"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app, auth}