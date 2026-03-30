import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

const defaultFirebaseConfig = {
  apiKey: "REEMPLAZAR_API_KEY",
  authDomain: "REEMPLAZAR_AUTH_DOMAIN",
  projectId: "REEMPLAZAR_PROJECT_ID",
  storageBucket: "REEMPLAZAR_STORAGE_BUCKET",
  messagingSenderId: "REEMPLAZAR_MESSAGING_SENDER_ID",
  appId: "REEMPLAZAR_APP_ID",
};

const runtimeConfig = window.CONVERSA_FIREBASE_CONFIG ?? defaultFirebaseConfig;
const app = initializeApp(runtimeConfig);
const auth = getAuth(app);

const overlay = document.querySelector("#login-overlay");
const form = document.querySelector("#login-form");
const message = document.querySelector("#auth-message");
const ticket = document.querySelector("#ticket-id");

const randomTicket = () => Math.floor(10000000 + Math.random() * 89999999);
ticket.textContent = randomTicket();

onAuthStateChanged(auth, (user) => {
  overlay.classList.toggle("hidden", !!user);
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  message.textContent = "";

  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    message.textContent = "No se pudo iniciar sesión. Verifica credenciales/config Firebase.";
    console.error(error);
  }
});
