
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCXVP80qV0L0pnnxeTLB7O0vtSsbz-wCjE",
    authDomain: "basededatostotem.firebaseapp.com",
    projectId: "basededatostotem",
    storageBucket: "basededatostotem.firebasestorage.app",
    messagingSenderId: "960013585717",
    appId: "1:960013585717:web:f3289cd65a0ca964ce907c",
    measurementId: "G-3RE0HSVYPY"
};

// Programar desde aqui porfa -.-
const app = initializeApp(firebaseConfig);//configuarion de nuestra base de datos firebase
export const autenticacion = getAuth(app);//variable de autentificacion por email
export const autenticacionGoogle = new GoogleAuthProvider()