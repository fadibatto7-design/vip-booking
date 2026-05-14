import { initializeApp } from "firebase/app";

import {
  getFirestore
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBGud6fR-g6_rPIKi4l5lwgJ7PSD2J1RpQ",
  authDomain: "musicno1-booking.firebaseapp.com",
  projectId: "musicno1-booking",
  storageBucket: "musicno1-booking.firebasestorage.app",
  messagingSenderId: "328528136730",
  appId: "1:328528136730:web:783722863ab8c5b03fdfa3",
  measurementId: "G-PSG6X5SP8K"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);