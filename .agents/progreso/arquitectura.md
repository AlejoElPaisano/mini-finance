# Arquitectura del Proyecto

## Estructura de Carpetas

```
/
├─ index.html
├─ pages/
│  ├─ simulador.html
│  └─ resumen.html
├─ base/
│  ├─ scripts/
│  │  ├─ config.js
│  │  ├─ state.js
│  │  ├─ dom.js
│  │  ├─ render.js
│  │  ├─ events.js
│  │  └─ main.js
│  └─ styles/
│     ├─ reset.css
│     ├─ tokens.css
│     ├─ base.css
│     ├─ layout.css
│     ├─ components.css
│     ├─ motion.css
│     ├─ preferences.css
│     └─ main.css
├─ assets/
│  ├─ img/
│  ├─ icons/
│  └─ data/
├─ docs/
│  └─ informe-uso-ia.md
├─ .agents/
│  └─ progreso/
│     ├─ BITACORA.md
│     └─ arquitectura.md
└─ README.md
```

## Descripción Conceptual

### HTML
Punto de entrada en `index.html`. Páginas adicionales dentro de `pages/` para mantener la raíz limpia y manejar rutas relativas de forma predecible. Cada documento es una unidad semántica independiente pero con navegación compartida.

### CSS
Modularizado por responsabilidad. `reset.css` y `tokens.css` definen la base. El resto de los archivos se especializan en layout, componentes, animaciones y preferencias del usuario. Se importan desde un `main.css` central.

### JavaScript
Arquitectura modular vanilla. Cada archivo tiene una única responsabilidad:
- `config.js`: constantes y configuración.
- `state.js`: estado de la aplicación y persistencia en `localStorage`.
- `dom.js`: selectores centralizados.
- `render.js`: generación de HTML dinámico.
- `events.js`: registro de eventos.
- `main.js`: orquestador de inicialización.

### Assets
Recursos estáticos organizados por tipo: imágenes, iconos y datos JSON locales.

### Documentación
README para usuarios y `docs/` para entregables académicos como el informe de uso de IA.

### Contexto Interno
La carpeta `.agents/` aloja la skill especializada y el seguimiento del progreso del proyecto sin afectar el código fuente ni el deploy.
