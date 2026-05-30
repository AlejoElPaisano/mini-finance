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
│  │  ├─ simulator.js
│  │  ├─ local-storage.js
│  │  ├─ helpers.js
│  │  ├─ pesito-brain.js
│  │  └─ pesito-chat.js
│  └─ styles/
│     ├─ reset.css
│     ├─ tokens.css
│     ├─ base.css
│     ├─ layout.css
│     ├─ components.css
│     ├─ home.css
│     ├─ footer.css
│     ├─ accessibility.css
│     ├─ login.css
│     ├─ motion.css
│     ├─ preferences.css
│     ├─ simulator.css
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

## Descripcion Conceptual

### HTML
Punto de entrada protegido: las paginas principales verifican sesion mediante auth guard en `<head>`. Si no hay sesion activa (`miniFinanceSession` en localStorage), redirigen a `pages/login.html`.
- `pages/login.html`: Autenticacion con tres vistas (login, registro, recuperacion).
- `index.html`: Dashboard principal con hero, metricas, logros, grafico y movimientos.
- `pages/simulador.html`: Formularios de ingresos, gastos, metas de ahorro y filtros.
- `pages/resumen.html`: Historial completo, filtros y calculos de totales.
- `pages/market-rates.html`: Pagina de cotizaciones (en desarrollo).

### CSS
- `reset.css`: Normalizacion y box-sizing global.
- `tokens.css`: Variables de diseno (colores, tipografia, espaciado, sombras).
- `base.css`: Estilos tipograficos y de elementos base.
- `layout.css`: Estructura de pagina, grid y navegacion responsive.
- `components.css`: Cards, botones, formularios, alertas, filtros y lista de movimientos.
- `home.css`: Estilos especificos del dashboard de inicio.
- `footer.css`: Footer desplegable tipo cajon con glassmorphism.
- `accessibility.css`: Herramientas de accesibilidad y menu de usuario.
- `login.css`: Estilos de autenticacion con gradiente de acento.
- `pesito.css`: Estilos del asistente flotante.
- `main.css`: Importa todos los modulos anteriores.

### JavaScript
- `config.js`: Constantes, categorias, claves de storage y valores por defecto.
- `state.js`: Estado centralizado, localStorage y calculos financieros.
- `dom.js`: Centralizacion de selectores del DOM.
- `render.js`: Renderizado dinamico de metricas, movimientos, alertas y meta de ahorro.
- `events.js`: Listeners de formularios, filtros, eliminacion y alertas.
- `main.js`: Orquestador de modulos, menu de usuario y logout.
- `simulator.js`: Logica del simulador sincronizada con el dashboard.
- `local-storage.js`: Helpers de persistencia auxiliares.
- `helpers.js`: Formato monetario para el simulador.
- `footer.js`: Toggle del footer desplegable con persistencia.
- `login.js`: Logica de autenticacion y gestion de sesion.
- `pesito-brain.js`: Arbol de decisiones del asistente virtual.
- `pesito-chat.js`: Interactividad del chat flotante.

### Assets
Recursos estaticos: imagenes, iconos y datos JSON locales.

### Documentacion
README para usuarios y docs/ para entregables academicos.

### Contexto Interno
Carpeta `.agents/` con skill especializada (`SKILL.md`) y seguimiento de progreso (`progreso/Memory.md` y `progreso/arquitectura.md`).
