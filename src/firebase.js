// src/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebaseの設定情報（自分のに書き換える）
const firebaseConfig = {
    apiKey: "AIzaSyAUkQQsc-t5vnOr81frsW8oofw59NKVAnM",
    authDomain: "taskcheck-5025b.firebaseapp.com",
    projectId: "taskcheck-5025b",
    storageBucket: "taskcheck-5025b.firebasestorage.app",
    messagingSenderId: "1026871835093",
    appId: "1:1026871835093:web:17f9de716b1ecb8758e55c",
    measurementId: "G-2LQ6K5PRPP"
};

// Firebaseアプリ初期化
const app = initializeApp(firebaseConfig);

// Firestoreデータベース取得
export const db = getFirestore(app);
