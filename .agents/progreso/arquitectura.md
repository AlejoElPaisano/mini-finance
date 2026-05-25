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
│  │  └─ footer.js
│  └─ styles/
│     ├─ reset.css
│     ├─ tokens.css
│     ├─ base.css
│     ├─ layout.css
│     ├─ components.css
│     ├─ footer.css
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
│  │  └─ footer.js
│  └─ styles/
│     ├─ reset.css
│     ├─ tokens.css
│     ├─ base.css
│     ├─ layout.css
│     ├─ components.css
│     ├─ footer.css
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
│     ├─ Memory.md
│     └─ arquitectura.md
└─ README.md
```

## Descripcion Conceptual

### HTML
Punto de entrada en `index.html`. Paginas adicionales dentro de `pages/` para mantener la raiz limpia y manejar rutas relativas de forma predecible.
- `index.html`: Dashboard principal con saldo, metricas y alertas visuales.
- `pages/simulador.html`: Formularios para agregar ingresos y gastos, clasificar por categoria, gestionar metas de ahorro y limite de gasto. Filtros dinamicos por tipo y categoria.
- `pages/resumen.html`: Resumen financiero detallado con historial completo, filtros y calculos de totales.
- `pages/market-rates.html`: Pagina de cotizaciones (adicional al equipo, contenido en desarrollo).

Todos los documentos comparten navegacion semantica consistente, usan `aria-current` para indicar la pagina activa y `aria-live` para alertas dinamicas.

### CSS
Modularizado por responsabilidad.
- `reset.css`: normalizacion y `box-sizing` global.
- `tokens.css`: variables de diseño (colores, tipografia, espaciado, sombras).
- `base.css`: estilos tipograficos y de elementos base.
- `layout.css`: estructura de pagina, grid del dashboard, navegacion responsive con media queries.
- `components.css`: cards, botones, formularios, alertas, filtros, lista de movimientos.
- `footer.css`: footer desplegable tipo cajon con glassmorphism, toggle persistente y grid de equipo; footer simplificado para paginas secundarias.
- `main.css`: importa todos los modulos anteriores.

### JavaScript
Arquitectura modular vanilla orientada a funcionalidades financieras. Cada modulo tiene responsabilidad unica:
- `config.js`: constantes, categorias predefinidas, claves de storage, valores por defecto.
- `state.js`: gestion del estado, persistencia en `localStorage`, calculos financieros (ingresos, gastos, saldo, totales por categoria) y logica de alertas visuales.
- `dom.js`: centralizacion de selectores del DOM para evitar repeticion.
- `render.js`: generacion dinamica de movimientos, metricas, filtros y alertas en el DOM.
- `events.js`: registro de listeners para formularios, filtros, eliminacion de movimientos y configuracion de alertas.
- `main.js`: orquestador que inicializa todos los modulos al cargar el DOM.
- `footer.js`: gestiona el estado abierto/cerrado del footer desplegable, persiste en localStorage y ajusta el padding del body dinamicamente.

### Assets
Recursos estaticos organizados por tipo: imagenes, iconos y datos JSON locales (ej. categorias o consejos financieros).

### Documentacion
README para usuarios y `docs/` para entregables academicos como el informe de uso de IA.

### Contexto Interno
La carpeta `.agents/` aloja la skill especializada (`SKILL.md`) y el seguimiento del progreso (`progreso/Memory.md` y `progreso/arquitectura.md`) sin afectar el codigo fuente ni el deploy.
