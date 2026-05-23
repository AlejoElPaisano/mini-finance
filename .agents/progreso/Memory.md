# Memory

## Consigna Oficial

Idea 5 - IntegrarTEC 2026: Mini Finance
- Tipo: Simulador de presupuesto personal.
- Nicho: Finanzas personales.
- Objetivo: Registrar ingresos, gastos y metas de ahorro. Visualizar saldo y recibir advertencias segun habitos de gasto.
- Paginas sugeridas: Inicio; Simulador; Resumen financiero.
- Funcionalidades JS: Agregar ingresos; Agregar gastos; Clasificar gastos por categoria; Calcular saldo disponible; Calcular porcentaje de ahorro; Mostrar advertencias visuales.
- Storage: Guardar ingresos, gastos, categorias, metas de ahorro o historial mensual.
- Desafio obligatorio: Alertas visuales en el DOM cuando el usuario supere un limite de gasto o no alcance su meta de ahorro.

## 22 de mayo de 2026

### Estado General
En desarrollo activo. Estructura base completada y contenido funcional en construccion. Alineacion de archivos del equipo a la skill oficial.

### Completado
- Estructura de carpetas base (`pages/`, `base/styles/`, `base/scripts/`).
- `index.html`, `pages/simulador.html`, `pages/resumen.html`, `pages/market-rates.html`: navegacion semantica consistente, rutas relativas correctas y correccion de semantica HTML.
- `base/styles/reset.css`: limpieza de estilos por defecto y `box-sizing: border-box` global.
- `base/styles/tokens.css`: variables CSS para colores, tipografia, espaciados y sombras.
- `base/styles/base.css`, `layout.css`, `main.css`: estilos base, layout responsive y sistema de importacion.
- Eliminacion de archivos desviados (`assets/css/styles.css`, `assets/js/main.js`) para alinear estructura con la skill.
- Archivos de contexto interno creados y actualizados: `.agents/progreso/Memory.md` y `.agents/progreso/arquitectura.md`.
- Skill actualizada con regla de automatizacion de contexto.

### Revertido estrategicamente (para commits del equipo)
- `base/scripts/config.js`, `state.js`, `dom.js`, `render.js`, `events.js`, `main.js`: removidos para que el equipo implemente los modulos JS en sus commits.
- `base/styles/components.css`: removido para que el equipo desarrolle los estilos de componentes (cards, botones, formularios, alertas).
- Tags `<script>` removidos de los HTML para desacoplar la estructura de la logica funcional.

### Pendiente (reservado para el equipo)
- Modulos JavaScript: config, state, dom, render, events, main.
- CSS de componentes: cards, botones, formularios, alertas, lista de movimientos, filtros.
- Logica funcional: localStorage, calculos financieros, alertas visuales (desafio obligatorio), renderizado dinamico.
- Pagina `pages/market-rates.html`: contenido funcional de cotizaciones (fetch opcional).
- Assets (imagenes, iconos, datos JSON).
- README completo.
- Informe de uso de IA en `docs/`.
- Deploy funcional.

## 22 de mayo de 2026 (continuacion)

### Completado
- Archivo `.env` creado en raiz con credenciales de Trello protegidas.
- `.gitignore` actualizado para excluir `.env` y evitar subida de credenciales a GitHub.
- Skill personalizada `trello-sync` creada y actualizada en `.agents/skills/trello-sync/`:
  - `skill.json`: define comandos `/trello-crear`, `/trello-mover` y `/trello-eliminar` con argumentos `tarea` y `estado`.
  - `index.js`: script Node.js nativo con modulos `https` y `fs` para leer `.env`. Soporta crear tarjetas nuevas, mover tarjetas existentes y eliminar tarjetas del tablero.
  - `SKILL.md`: documentacion de uso para OpenCode Desktop con reglas de comando, ejemplos y confirmacion para eliminaciones irreversibles.

### Skills Instaladas
- `frontend-design` desde `https://github.com/anthropics/skills` (instalada via `pnpm dlx` en `.agents/skills/frontend-design/`).
- `mobile-first-design` desde `https://github.com/aj-geddes/useful-ai-prompts` (instalada via `pnpm dlx` en `.agents/skills/mobile-first-design/`).

## 23 de mayo de 2026

### Estado General
En desarrollo activo. Aplicacion de directrices de frontend-design y mobile-first-design al codigo del proyecto.

### Completado
- `base/styles/tokens.css` actualizado con tipografia distintiva (Playfair Display + Sora), colores con acento naranja, sombras dramaticas y variables de transicion.
- `base/styles/base.css` actualizado con jerarquia tipografica, fuentes display/body, touch targets minimos 44x44px, y media queries mobile-first.
- `base/styles/layout.css` reescrito con enfoque mobile-first: navegacion vertical en mobile, grid asimetrico en desktop, breakpoints con `min-width`.
- `base/styles/components.css` creado con estetica audaz: cards con sombras dramaticas y gradientes en hover, botones con estados sorprendentes, formularios enfocados, alertas con bordes laterales.
- `base/styles/main.css` corregido: removido import inexistente `simulator.css`, agregado `components.css`.
- `index.html`, `pages/simulador.html`, `pages/resumen.html`, `pages/market-rates.html`: agregadas fuentes de Google Fonts, limpieza de codigo comentado y espacios en blanco masivos en simulador.html.

### Pendiente (reservado para el equipo)
- Modulos JavaScript: config, state, dom, render, events, main.
- Logica funcional: localStorage, calculos financieros, alertas visuales (desafio obligatorio), renderizado dinamico.
- Pagina `pages/market-rates.html`: contenido funcional de cotizaciones (fetch opcional).
- Assets (imagenes, iconos, datos JSON).
- README completo.
- Informe de uso de IA en `docs/`.
- Deploy funcional.
