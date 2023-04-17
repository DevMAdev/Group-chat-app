import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBH7da8cWaeEKXsTCJzGo9aCCW6m2wqqHQ",
  authDomain: "group-chat-c251d.firebaseapp.com",
  projectId: "group-chat-c251d",
  storageBucket: "group-chat-c251d.appspot.com",
  messagingSenderId: "1049410177261",
  appId: "1:1049410177261:web:c1986cea580114a01864e4"
};

const app = initializeApp(firebaseConfig);
export default app;