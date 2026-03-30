# Conversa Tools

Plantilla web inspirada en Paex360 para gestión de tickets y módulo **Formulario**, con autenticación obligatoria por Firebase y lista para desplegar en Netlify.

## Incluye

- Branding cambiado a **Conversa Tools**.
- Módulo de **Encuesta** reemplazado por **Formulario**.
- Vista de login separada: el formulario no se muestra hasta autenticar correctamente en Firebase.
- Validación de acceso usando `onAuthStateChanged` de Firebase Auth.
- Configuración de Netlify para deploy estático.

## Firebase integrado

El proyecto ya está configurado con este Firebase:

- `projectId`: `conversatools`
- `authDomain`: `conversatools.firebaseapp.com`
- `storageBucket`: `conversatools.firebasestorage.app`

> Importante: para poder entrar, el usuario debe existir en Firebase Authentication (Email/Password).

## Ejecutar local

Como sitio estático puedes abrir con un servidor simple:

```bash
python -m http.server 8080
```

Luego abre `http://localhost:8080`.

## Despliegue en Netlify

- Publish directory: `.`
- Build command: *(vacío)*
