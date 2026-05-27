# Arquitectura del Proyecto

## Consigna Oficial

Idea 5 - IntegrarTEC 2026: Mini Finance
- Tipo: Simulador de presupuesto personal.
- Nicho: Finanzas personales.
- Objetivo: Registrar ingresos, gastos y metas de ahorro. Visualizar saldo y recibir advertencias segun habitos de gasto.
- Paginas sugeridas: Inicio; Simulador; Resumen financiero.
- Funcionalidades JS: Agregar ingresos; Agregar gastos; Clasificar gastos por categoria; Calcular saldo disponible; Calcular porcentaje de ahorro; Mostrar advertencias visuales.
- Storage: Guardar ingresos, gastos, categorias, metas de ahorro o historial mensual.
- Desafio obligatorio: Alertas visuales en el DOM cuando el usuario supere un limite de gasto o no alcance su meta de ahorro.

## Estructura de Carpetas

```
/
├─ index.html
├─ pages/
│  ├─ simulador.html
│  ├─ resumen.html
│  └─ market-rates.html
├─ base/
│  ├─ scripts/
│  │  ├─ config.js
│  │  ├─ state.js
│  │  ├─ dom.js
│  │  ├─ render.js
│  │  ├─ events.js
│  │  ├─ main.js
│  │  ├─ footer.js
│  │  ├─ login.js
│  │  ├─ pesito-brain.js
│  │  └─ pesito-chat.js
│  └─ styles/
│     ├─ reset.css
│     ├─ tokens.css
│     ├─ base.css
│     ├─ layout.css
│     ├─ components.css
│     ├─ footer.css
│     ├─ accessibility.css
│     ├─ login.css
│     ├─ motion.css
│     ├─ preferences.css
│     ├─ pesito.css
│     └─ main.css
├─ assets/
│  ├─ img/
│  ├─ icons/
│  └─ data/
├─ docs/
│  └─ informe-uso-ia.md
├─ .agents/
│  ├─ skills/
│  │  ├─ buenas-practica-mini-finance/
│  │  │  └─ SKILL.md
│  │  ├─ frontend-design/
│  │  ├─ interface-design/
│  │  ├─ mobile-first-design/
│  │  ├─ trello-sync/
│  │  └─ design-lab/
│  └─ progreso/
│     ├─ Memory.md
│     └─ arquitectura.md
└─ README.md
```
/
├─ index.html
├─ pages/
│  ├─ simulador.html
│  ├─ resumen.html
│  └─ market-rates.html
├─ base/
│  ├─ scripts/
│  │  ├─ config.js
│  │  ├─ state.js
│  │  ├─ dom.js
│  │  ├─ render.js
│  │  ├─ events.js
│  │  ├─ main.js
│  │  ├─ footer.js
│  │  └─ login.js
│  └─ styles/
│     ├─ reset.css
│     ├─ tokens.css
│     ├─ base.css
│     ├─ layout.css
│     ├─ components.css
│     ├─ footer.css
│     ├─ accessibility.css
│     ├─ login.css
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
│  ├─ skills/
│  │  ├─ buenas-practica-mini-finance/
│  │  │  └─ SKILL.md
│  │  ├─ frontend-design/
│  │  ├─ interface-design/
│  │  ├─ mobile-first-design/
│  │  ├─ trello-sync/
│  │  └─ design-lab/
│  └─ progreso/
│     ├─ Memory.md
│     └─ arquitectura.md
└─ README.md
```

## Descripcion Conceptual

### HTML
Punto de entrada protegido: las paginas principales (`index.html`, `simulador`, `resumen`, `market-rates`) verifican la sesion mediante un auth guard en `<head>`. Si no hay sesion activa (`miniFinanceSession` en localStorage), redirigen automaticamente a `pages/login.html`.
- `pages/login.html`: Pagina de autenticacion con tres vistas intercambiables (login, registro, recuperacion de contraseña), validacion de formularios y persistencia en localStorage. Tras login exitoso, redirige al dashboard.
- `index.html`: Dashboard principal con saldo, metricas y alertas visuales. Accesible unicamente con sesion activa.
- `pages/simulador.html`: Formularios para agregar ingresos y gastos, clasificar por categoria, gestionar metas de ahorro y limite de gasto. Filtros dinamicos por tipo y categoria. Accesible unicamente con sesion activa.
- `pages/resumen.html`: Resumen financiero detallado con historial completo, filtros y calculos de totales. Accesible unicamente con sesion activa.
- `pages/market-rates.html`: Pagina de cotizaciones (adicional al equipo, contenido en desarrollo). Accesible unicamente con sesion activa.

Todos los documentos protegidos comparten navegacion semantica consistente, usan `aria-current` para indicar la pagina activa y `aria-live` para alertas dinamicas. El header agrupa herramientas de accesibilidad (dislexia, daltonismo), dark mode y un menu desplegable de usuario (icono 👤) con opcion de cerrar sesion.

### CSS
Modularizado por responsabilidad.
- `reset.css`: normalizacion y `box-sizing` global.
- `tokens.css`: variables de diseño (colores, tipografia, espaciado, sombras).
- `base.css`: estilos tipograficos y de elementos base.
- `layout.css`: estructura de pagina, grid del dashboard, navegacion responsive con media queries.
- `components.css`: cards, botones, formularios, alertas, filtros, lista de movimientos con items de ingreso/gasto y estilos de eliminacion.
- `footer.css`: footer desplegable tipo cajon con glassmorphism, toggle persistente y grid de equipo; footer simplificado para paginas secundarias.
- `accessibility.css`: herramientas de accesibilidad persistentes en header (modo dislexia con fuente OpenDyslexic y modo daltonismo con paleta segura y bordes reforzados), botones de herramientas del header y menu desplegable de usuario con animacion de aparicion.
- `login.css`: estilos especificos de la pagina de autenticacion, diseno mobile-first con card centrada, gradiente de acento y animaciones de transicion entre vistas.
- `pesito.css`: estilos dedicados del asistente flotante. Ventana tipo bottom-sheet en mobile y ventana flotante en desktop (breakpoint 768px). Incluye header con avatar SVG, burbujas de mensaje, typing indicator, botones de opciones guiadas y toggle flotante con microinteracciones.
- `main.css`: importa todos los modulos anteriores.

### JavaScript
Arquitectura modular vanilla orientada a funcionalidades financieras. Cada modulo tiene responsabilidad unica:
- `config.js`: constantes, categorias predefinidas, claves de storage, valores por defecto.
- `state.js`: gestion del estado, persistencia en `localStorage`, calculos financieros (ingresos, gastos, saldo, totales por categoria) y logica de alertas visuales.
- `dom.js`: centralizacion de selectores del DOM para evitar repeticion.
- `render.js`: generacion dinamica de movimientos, metricas, filtros y alertas en el DOM.
- `events.js`: registro de listeners para formularios, filtros, eliminacion de movimientos y configuracion de alertas.
- `main.js`: orquestador que inicializa todos los modulos al cargar el DOM. Incluye manejo del menu desplegable de usuario (toggle del dropdown, cierre al hacer click fuera) y logout: escucha el click en `#logout-btn`, elimina `miniFinanceSession` de localStorage y redirige a `pages/login.html`.
- `footer.js`: gestiona el estado abierto/cerrado del footer desplegable, persiste en localStorage y ajusta el padding del body dinamicamente.
- `login.js`: logica de autenticacion vanilla con tres vistas intercambiables, validacion de formularios, persistencia de usuarios en localStorage (`miniFinanceUsers`), gestion de sesion (`miniFinanceSession`) y mensajes de estado en el DOM.
- `pesito-brain.js`: arbol de decisiones del asistente virtual Pesito. Define nodos conversacionales con UX Writing financiero amigable (simulador, consejos, seguridad, equipo).
- `pesito-chat.js`: logica interactiva del chat flotante. Gestiona apertura/cierre con animaciones CSS, renderizado de mensajes, typing indicator, navegacion por el arbol de decisiones y accesibilidad (tecla Escape, ARIA, cierre al clic fuera).

### Assets
Recursos estaticos organizados por tipo: imagenes, iconos y datos JSON locales (ej. categorias o consejos financieros).

### Documentacion
README para usuarios y `docs/` para entregables academicos como el informe de uso de IA.

### Contexto Interno
La carpeta `.agents/` aloja la skill especializada (`SKILL.md`) y el seguimiento del progreso (`progreso/Memory.md` y `progreso/arquitectura.md`) sin afectar el codigo fuente ni el deploy.
