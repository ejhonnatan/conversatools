import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

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

const menuButtons = [...document.querySelectorAll(".menu-btn")];
const modules = {
  formulario: document.querySelector("#section-formulario"),
  escalamientos: document.querySelector("#section-escalamientos"),
  ctl: document.querySelector("#section-ctl"),
  dashboard: document.querySelector("#section-dashboard"),
};

const state = {
  user: null,
  escalamientos: [],
  ctl: [],
  selectedTicket: null,
};

const randomTicket = () => Math.floor(10000000 + Math.random() * 89999999);
ticket.textContent = randomTicket();

const seedCases = (email) => {
  const now = new Date().toISOString().slice(0, 10);
  return [
    { ticket: "24611735", escalador: "Ana Ruiz", cliente: "Walmart", noCliente: "124575", motivo: "Mala atención", status: "Nuevo", escaladoA: email, createdAt: now, cierreAcciones: "" },
    { ticket: "24611748", escalador: "Mario León", cliente: "Chedraui", noCliente: "733299", motivo: "Demora en respuesta", status: "En proceso", escaladoA: email, createdAt: now, cierreAcciones: "" },
    { ticket: "24611802", escalador: "Paola Díaz", cliente: "Soriana", noCliente: "990031", motivo: "Seguimiento incompleto", status: "Nuevo", escaladoA: email, createdAt: now, cierreAcciones: "" },
  ];
};

const showSection = (name) => {
  Object.entries(modules).forEach(([key, el]) => el.classList.toggle("active", key === name));
  menuButtons.forEach((btn) => btn.classList.toggle("active", btn.dataset.section === name));
  if (name === "dashboard") renderDashboard();
};
menuButtons.forEach((btn) => btn.addEventListener("click", () => showSection(btn.dataset.section)));

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

const renderEscalamientos = () => {
  const list = document.querySelector("#escalamientos-list");
  const q = document.querySelector("#search-ticket").value.trim();
  const mine = state.escalamientos.filter((x) => x.escaladoA === state.user.email && x.ticket.includes(q));

  list.innerHTML = mine.map((x) => `<button class="list-item" data-ticket="${x.ticket}"><strong>#${x.ticket}</strong><span>${x.cliente}</span><small>${x.status}</small></button>`).join("") || "<p>Sin escalamientos asignados.</p>";

  list.querySelectorAll(".list-item").forEach((btn) => btn.addEventListener("click", () => {
    state.selectedTicket = btn.dataset.ticket;
    renderDetalle();
  }));

  if (!state.selectedTicket && mine[0]) state.selectedTicket = mine[0].ticket;
  renderDetalle();
  renderCtlTickets();
};

const renderDetalle = () => {
  const panel = document.querySelector("#escalamiento-detalle");
  const c = state.escalamientos.find((x) => x.ticket === state.selectedTicket);
  if (!c) {
    panel.innerHTML = "<p>Selecciona un ticket.</p>";
    return;
  }
  panel.innerHTML = `
    <label># TICKET<input value="${c.ticket}" disabled /></label>
    <label>QUIEN ESCALÓ<input value="${c.escalador}" disabled /></label>
    <label>CLIENTE<input value="${c.cliente}" disabled /></label>
    <label>NO CLIENTE<input value="${c.noCliente}" disabled /></label>
    <label>MOTIVO<input value="${c.motivo}" disabled /></label>
    <label>STATUS<select id="detalle-status"><option ${c.status === "Nuevo" ? "selected" : ""}>Nuevo</option><option ${c.status === "En proceso" ? "selected" : ""}>En proceso</option></select></label>
  `;
  panel.querySelector("#detalle-status").addEventListener("change", (e) => {
    c.status = e.target.value;
    renderEscalamientos();
  });

  const cierre = document.querySelector("#esc-cierre");
  const msg = document.querySelector("#esc-msg");
  cierre.value = c.cierreAcciones ?? "";
  msg.textContent = "";
};

const renderCtlTickets = () => {
  const select = document.querySelector("#ctl-ticket");
  const mine = state.escalamientos.filter((x) => x.escaladoA === state.user.email);
  select.innerHTML = mine.map((x) => `<option value="${x.ticket}">#${x.ticket} · ${x.cliente}</option>`).join("");
};

const renderDashboard = () => {
  const filter = document.querySelector("#dash-filter").value;
  const mine = state.escalamientos.filter((x) => x.escaladoA === state.user.email);
  const items = filter === "all" ? mine : mine.filter((x) => x.status === filter);

  document.querySelector("#kpi-total").textContent = mine.length;
  document.querySelector("#kpi-pend").textContent = mine.filter((x) => x.status !== "Cerrado CTL").length;
  document.querySelector("#kpi-ctl").textContent = mine.filter((x) => x.status === "Cerrado CTL").length;

  const canvas = document.querySelector("#dash-canvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const barW = 140;
  items.forEach((x, i) => {
    const h = 40 + (Number.parseInt(x.ticket.slice(-2), 10) % 120);
    const xPos = 40 + i * (barW + 20);
    ctx.fillStyle = x.status === "Cerrado CTL" ? "#27ae60" : "#1f5fbf";
    ctx.fillRect(xPos, 190 - h, barW, h);
    ctx.fillStyle = "#0f172a";
    ctx.fillText(`#${x.ticket}`, xPos, 210);
  });
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    state.user = user;
    state.escalamientos = seedCases(user.email);
    showApp();
    renderEscalamientos();
    renderDashboard();
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

logoutBtn.addEventListener("click", async () => signOut(auth));

document.querySelector("#search-ticket").addEventListener("input", renderEscalamientos);
document.querySelector("#dash-filter").addEventListener("change", renderDashboard);

const buildFormularioItem = (overrides = {}) => ({
  ticket: String(randomTicket()),
  escalador: document.querySelector("#fi-escalador").value || "Sin nombre",
  noCliente: document.querySelector("#fi-no-cliente").value || "N/A",
  cliente: document.querySelector("#fi-cliente").value || "Sin cliente",
  motivo: document.querySelector("#fi-motivo").value || "Sin motivo",
  status: document.querySelector("#fi-status").value,
  escaladoA: document.querySelector("#fi-escalado-a").value || state.user.email,
  createdAt: new Date().toISOString().slice(0, 10),
  cierreAcciones: "",
  ...overrides,
});

document.querySelector("#btn-escalar").addEventListener("click", () => {
  const item = buildFormularioItem({ status: "Nuevo" });
  state.escalamientos.unshift(item);
  document.querySelector("#fi-msg").textContent = `Ticket #${item.ticket} escalado correctamente.`;
  showSection("escalamientos");
  state.selectedTicket = item.ticket;
  renderEscalamientos();
});



document.querySelector("#btn-cerrar").addEventListener("click", () => {
  const item = buildFormularioItem({ status: "Cerrado", escaladoA: "" });
  state.escalamientos.unshift(item);
  document.querySelector("#fi-msg").textContent = `Ticket #${item.ticket} cerrado sin escalamiento.`;
  renderDashboard();
});
document.querySelector("#btn-guardar-ctl").addEventListener("click", () => {
  const ticketId = document.querySelector("#ctl-ticket").value;
  const row = state.escalamientos.find((x) => x.ticket === ticketId);
  if (row) row.status = "Cerrado CTL";
  state.ctl.push({
    ticket: ticketId,
    tipo: document.querySelector("#ctl-tipo").value,
    causa: document.querySelector("#ctl-causa").value,
    accion: document.querySelector("#ctl-accion").value,
    resultado: document.querySelector("#ctl-resultado").value,
    fecha: document.querySelector("#ctl-fecha").value,
  });
  document.querySelector("#ctl-msg").textContent = "Cierre CTL guardado correctamente.";
  renderEscalamientos();
  renderDashboard();
});


document.querySelector("#global-token").addEventListener("input", (e) => {
  const token = e.target.value.trim();
  document.querySelector("#search-ticket").value = token;
  showSection("escalamientos");
  renderEscalamientos();
});

document.querySelector("#btn-guardar-cierre").addEventListener("click", () => {
  const c = state.escalamientos.find((x) => x.ticket === state.selectedTicket);
  if (!c) return;
  c.cierreAcciones = document.querySelector("#esc-cierre").value;
  document.querySelector("#esc-msg").textContent = "Acciones de cierre guardadas.";
});
