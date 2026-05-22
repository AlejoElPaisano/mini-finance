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
│  ├─ skills/
│  │  └─ buenas-practica-mini-finance/
│  │     └─ SKILL.md
│  └─ progreso/
│     ├─ BITACORA.md
│     └─ arquitectura.md
└─ README.md
```

## Descripcion Conceptual

### HTML
Punto de entrada en `index.html`. Paginas adicionales dentro de `pages/` para mantener la raiz limpia y manejar rutas relativas de forma predecible.
- `index.html`: Dashboard principal con saldo, metricas y alertas visuales.
- `pages/simulador.html`: Formularios para agregar ingresos y gastos, clasificar por categoria, y gestionar metas de ahorro.
- `pages/resumen.html`: Resumen financiero detallado con historial, filtros y calculos.
- `pages/market-rates.html`: Pagina de cotizaciones (adicional al equipo).

### CSS
Modularizado por responsabilidad. `reset.css` y `tokens.css` definen la base. El resto se especializa en layout, componentes, animaciones y preferencias del usuario. Se importan desde `main.css` central.

### JavaScript
Arquitectura modular vanilla orientada a funcionalidades financieras:
- `config.js`: constantes, categorias, claves de storage, limites por defecto.
- `state.js`: estado de la app, localStorage, calculos de saldo, totales, porcentaje de ahorro y validacion de alertas (limite de gasto y meta de ahorro).
- `dom.js`: selectores centralizados del DOM.
- `render.js`: generacion dinamica de cards, tablas, metricas, mensajes y alertas visuales.
- `events.js`: registro de eventos de formularios, filtros y botones.
- `main.js`: orquestador de inicializacion.

### Assets
Recursos estaticos organizados por tipo: imagenes, iconos y datos JSON locales (ej. categorias o consejos financieros).

### Documentacion
README para usuarios y `docs/` para entregables academicos como el informe de uso de IA.

### Contexto Interno
La carpeta `.agents/` aloja la skill especializada y el seguimiento del progreso del proyecto sin afectar el codigo fuente ni el deploy.
