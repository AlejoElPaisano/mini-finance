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

## 25 de mayo de 2026 (evolución)

### Estado General
En desarrollo activo. Footer desplegable refinado según feedback del equipo.

### Completado
- Eliminada sección de navegación del footer en las 4 páginas.
- Título de equipo cambiado a "Desarrollado por:".
- Nombres de integrantes convertidos en links directos a LinkedIn (sin URL visible).
- Grid de equipo reestructurado a 2 columnas con layout limpio.
- `base/styles/footer.css`: ajustado grid del footer de 4 a 3 columnas, simplificada estructura del equipo, removidos estilos de links de miembro obsoletos.
- `index.html`, `pages/simulador.html`, `pages/resumen.html`, `pages/market-rates.html`: actualizados con nuevo layout del footer.

## 25 de mayo de 2026 (auditoría y refactorización)

### Estado General
Auditoría completa realizada con las skills `frontend-design` e `interface-design`. Código refactorizado para cumplir con estándares de diseño de interfaces de alto nivel.

### Completado
- **Auditoría completa**: 34 issues encontrados y corregidos en HTML, CSS y accesibilidad.
- **HTML mejorado**:
  - Agregado `type="button"` a todos los toggles de dark mode (4 páginas).
  - Agregados skip-to-content links para navegación por teclado.
  - Eliminado `main.js` duplicado en `index.html`.
  - Corregidos acentos: "Próximamente", "visualización", "categoría".
  - Arreglada estructura de label en simulador (separado output del label for).
  - Reemplazado `<strong>` por `<small class="form-hint">` para hints.
  - Eliminados trailing whitespaces y self-closing tags innecesarios.
- **CSS Tokens rebuild completo** (`tokens.css`):
  - Nueva arquitectura de tokens: foreground (4 niveles), background/surface (4 niveles), border (3 niveles), brand, semantic.
  - Sistema de espaciado con `--space-unit: 0.25rem`.
  - Sistema de elevación de superficies (surface shifts + bordes sutiles).
  - Sombras sutiles reemplazando dramatic shadows.
  - Tokens de motion con easing de deceleración (`cubic-bezier(0.16, 1, 0.3, 1)`).
  - Dark mode reestructurado con override de primitivas semánticas.
- **CSS Base mejorado** (`base.css`):
  - Agregada textura de fondo editorial (dot-grid via radial-gradient).
  - Clases utilitarias `.text-primary`, `.text-secondary`, `.text-tertiary`, `.text-muted`.
  - Corregidos touch targets (eliminado `min-width: 44px` de `<a>` inline).
  - Jerarquía tipográfica refinada con `line-height: 1.15` y `letter-spacing: -0.03em`.
- **CSS Layout mejorado** (`layout.css`):
  - Header sticky para mejor contexto de navegación.
  - `padding-bottom` en main para evitar que el footer fijo tape contenido.
  - Toggle de dark mode con micro-interacción de rotación.
- **CSS Components overhaul** (`components.css`):
  - Cards: eliminado gradiente decorativo, reemplazado por línea de acento animada vía `scaleY`.
  - Cards: agregada animación de entrada escalonada (`cardEnter`).
  - Botones: agregados estados `disabled`, `loading` (con spinner), `btn--secondary` (ghost).
  - Botones: focus-visible con double-ring, hover con `translateY(-1px)`.
  - Formularios: estado `.is-error`, hint class, custom select/date arrows via SVG inline.
  - Focus de inputs: border + outline sutil en lugar de glow excesivo.
  - Alertas: animación `slideIn`, bordes semánticos consistentes.
  - Empty state: contenedor con borde dashed y layout flex centrado.
- **CSS Footer refinado** (`footer.css`):
  - Eliminados magic numbers (reemplazados por `--footer-toggle-height`).
  - Corregido selector dark mode `.footer__member-link` → `.footer__member-name`.
  - Mejorado responsive para mobile (<480px).
  - Headings con `letter-spacing: 0.12em` para feel editorial.
- **CSS Simulator reescrito** (`simulator.css`):
  - Todos los selectores scrolpeados a `#movement-form` para evitar leaking.
  - Grid responsive: mobile 1-col → tablet 2-col → desktop 3-col.
  - Todos los hex raw reemplazados por tokens del sistema.
  - Custom range input styling con hover scale effect.
  - Valores monetarios con `font-family: var(--font-mono)`.

## 26 de mayo de 2026

### Estado General
En desarrollo activo. Sistema de autenticacion integrado con flujo completo de login/logout.

### Completado
- `pages/login.html`: pagina de acceso con tres vistas intercambiables (login, registro, recuperacion).
- `base/styles/login.css`: estilos de autenticacion con gradiente de acento animado.
- `base/styles/accessibility.css`: herramientas de accesibilidad (dislexia, daltonismo) y menu desplegable de usuario.
- `base/scripts/login.js`: logica de autenticacion con localStorage, validaciones, mensajes en DOM.
- `base/scripts/main.js`: manejo de menu desplegable de usuario (toggle, cierre al click fuera) y logout.
- `index.html`, `pages/simulador.html`, `pages/resumen.html`, `pages/market-rates.html`: auth guard en `<head>` que redirige a login si no hay sesion; header con herramientas de accesibilidad, dark mode y menu de usuario (👤) con opcion de cerrar sesion.
- Flujo: login exitoso → guarda `miniFinanceSession` → redirige a `index.html` → usuario navega libremente → click en 👤 → "Cerrar sesión" → elimina sesion → redirige a login.

### Pendiente (reservado para el equipo)
- Modulos JavaScript: config, state, dom, render, events, main.
- Logica funcional: localStorage, calculos financieros, alertas visuales (desafio obligatorio), renderizado dinamico.
- Pagina `pages/market-rates.html`: contenido funcional de cotizaciones (fetch opcional).
- Assets (imagenes, iconos, datos JSON).
- README completo.
- Informe de uso de IA en `docs/`.
- Deploy funcional.
