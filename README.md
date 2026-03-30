# Conversa Tools MVP

Plantilla web estática con login Firebase y 4 módulos operativos:

1. **Formulario Inicia**
2. **Escalamientos**
3. **CTL** (Cierre de ciclo NPS)
4. **Dashboard**

## Flujo MVP

- El usuario inicia sesión por Firebase Auth.
- Levanta caso en **Formulario Inicia** y puede generar escalamiento.
- El escalamiento aparece en **Escalamientos**, con buscador por `#Ticket` y detalle editable.
- En **CTL** se documenta cierre de ciclo NPS y se marca el ticket como `Cerrado CTL`.
- **Dashboard** muestra KPIs y gráfica interactiva por estado.

## Casos de demo incluidos

Al iniciar sesión se crean 3 escalamientos de ejemplo asignados al usuario logueado para mostrar el MVP.

## Ejecutar local

```bash
python -m http.server 8080
```

Abrir `http://localhost:8080`.

## Despliegue en Netlify

- Publish directory: `.`
- Build command: *(vacío)*
