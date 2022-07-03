import firebase from "firebase/app";
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCf9hoZ8cniJpGLkSzpM3C65Oq_nzy8lZg",
    authDomain: "crud-udemy-react-fa16d.firebaseapp.com",
    projectId: "crud-udemy-react-fa16d",
    storageBucket: "crud-udemy-react-fa16d.appspot.com",
    messagingSenderId: "99700320812",
    appId: "1:99700320812:web:3bad0dd99b89f45bb87f89"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export { firebase };