# Conversa Tools

Plantilla web inspirada en Paex360 para gestión de tickets y módulo **Formulario**, con login de Firebase y lista para desplegar en Netlify.

## Incluye

- Branding cambiado a **Conversa Tools**.
- Estructura del formulario solicitada (Información del Cliente + Estado y Seguimiento).
- Módulo de **Encuesta** reemplazado por **Formulario**.
- Login inicial con Firebase Authentication (email/contraseña).
- Configuración simple para Netlify.

## Configurar Firebase (pendiente de tus datos)

1. Crea un archivo `firebase-config.js` en la raíz con este contenido:

```js
window.CONVERSA_FIREBASE_CONFIG = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID",
};
```

2. En `index.html`, antes de `app.js`, agrega:

```html
<script src="firebase-config.js"></script>
```

3. Habilita en Firebase Authentication el proveedor de Email/Password.

## Despliegue en Netlify

Este proyecto es estático. Puedes desplegarlo directamente conectando el repo o usando Netlify Drop.

- Publish directory: `.`
- Build command: *(vacío)*

Si prefieres, después te pido los datos de Firebase y te lo dejo preparado con variables de entorno para un flujo más cerrado.
