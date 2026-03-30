import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCHGJHPjEtcAZ69zgWeGw5K01uWEM9HFZ4",
  authDomain: "conversatools.firebaseapp.com",
  projectId: "conversatools",
  storageBucket: "conversatools.firebasestorage.app",
  messagingSenderId: "216600616900",
  appId: "1:216600616900:web:9736de44390d7c13ac8e91",
  measurementId: "G-1KTQ9SDCS4",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginView = document.querySelector("#login-view");
const appView = document.querySelector("#app-view");
const form = document.querySelector("#login-form");
const message = document.querySelector("#auth-message");
const ticket = document.querySelector("#ticket-id");
const logoutBtn = document.querySelector("#logout-btn");

const randomTicket = () => Math.floor(10000000 + Math.random() * 89999999);
const showApp = () => {
  appView.classList.remove("hidden");
  appView.setAttribute("aria-hidden", "false");
  loginView.classList.add("hidden");
};
const showLogin = () => {
  loginView.classList.remove("hidden");
  appView.classList.add("hidden");
  appView.setAttribute("aria-hidden", "true");
};

ticket.textContent = randomTicket();

onAuthStateChanged(auth, (user) => {
  if (user) {
    showApp();
    return;
  }

  showLogin();
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  message.textContent = "";

  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    form.reset();
  } catch {
    message.textContent = "No se pudo iniciar sesión. Verifica usuario/contraseña en Firebase.";
  }
});

logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
});
