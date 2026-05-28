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

## 27 de mayo de 2026

### Estado General
En desarrollo activo. Modulos JavaScript financieros implementados y funcionando.

### Completado
- `base/scripts/config.js`: constantes, categorias predefinidas (ingresos/gastos), claves de storage y valores por defecto.
- `base/scripts/state.js`: gestion de estado con localStorage (movimientos, meta de ahorro, limite de gasto), calculos financieros (ingresos, gastos, saldo, totales por categoria, progreso de ahorro) y logica de alertas visuales (limite de gasto y meta de ahorro).
- `base/scripts/dom.js`: centralizacion de selectores del DOM.
- `base/scripts/render.js`: renderizado dinamico de dashboard, lista de movimientos, filtros de categoria, alertas visuales y monto ajustado.
- `base/scripts/events.js`: listeners para formulario de movimientos, cambio de tipo (actualiza categorias), filtros, eliminacion de movimientos y meta de ahorro.
- `base/scripts/main.js`: orquestador actualizado que inicializa dark mode, accesibilidad, menu de usuario, logout y los modulos financieros.
- `pages/simulador.html`: agregado campo de monto (`#amount`) al formulario; scripts financieros integrados.
- `index.html`, `pages/simulador.html`, `pages/resumen.html`: scripts financieros cargados en orden correcto.
- `base/styles/components.css`: agregados estilos para lista de movimientos (`.movements-list`, `.movement-item`, `.movement-item__delete`) con indicadores de color para ingresos/gastos.
- Alertas visuales: se muestran en el DOM cuando se supera el limite de gasto o no se alcanza la meta de ahorro.

## 27 de mayo de 2026 (documentacion)

### Estado General
Documentacion completa del proyecto creada.

### Completado
- `README.md`: documentacion completa con descripcion del proyecto, integrantes, idea elegida, tecnologias, funcionalidades detalladas, estructura de carpetas, instrucciones de uso e informacion sobre IA.
- `docs/informe-uso-ia.md`: informe de uso de inteligencia artificial con herramientas utilizadas, prompts utiles, partes asistidas, correcciones realizadas, aprendizajes y decisiones tomadas por el grupo.
- `.agents/skills/buenas-practica-mini-finance/SKILL.md`: agregadas reglas estrictas de Git (prohibicion de commit sin permiso y obligatoriedad de proponer titulo/descripcion antes de ejecutar).

### Pendiente (reservado para el equipo)
- Pagina `pages/market-rates.html`: contenido funcional de cotizaciones (fetch opcional).
- Assets (imagenes, iconos, datos JSON).
- README completo.
- Informe de uso de IA en `docs/`.
- Deploy funcional.

## 27 de mayo de 2026 (asistente virtual)

### Estado General
En desarrollo activo. Asistente virtual flotante "Pesito" integrado en todas las páginas.

### Completado
- Estructura HTML de Pesito agregada a `pages/simulador.html`, `pages/resumen.html` y `pages/market-rates.html`.
- Scripts `pesito-brain.js` y `pesito-chat.js` vinculados en las 4 páginas.
- `base/styles/pesito.css`: ya importado en `main.css`, estilos mobile-first del chat flotante verificados.

## 28 de mayo de 2026

### Estado General
En desarrollo activo. Reconstrucción completa de la página de inicio (`index.html`) en la rama `feat/home-ui-refactoring`, aplicando principios de diseño de interfaz y frontend.

### Completado
- `index.html`: reconstruido con nueva estructura semántica en 5 bloques definidos:
  1. **Hero**: contenedor azul con título, `<p id="daily-tip">` para consejo financiero del día, y botones de acción rápida (`Registrar Movimiento`, `Ver Resumen`).
  2. **Métricas Clave**: grid de 4 tarjetas (Total Ingresos, Total Gastos, Saldo Disponible, Meta de Ahorro). La tarjeta de saldo incluye clases `.is-positive` / `.is-negative` preparadas para estados dinámicos. La tarjeta de meta incluye barra de progreso visual con tokens de acento.
  3. **Panel de Logros**: `<section id="achievements-panel">` con empty state elegante (borde dashed, ícono de candado, texto de próximamente) listo para futura lógica de gamificación.
  4. **Distribución de Gastos**: tarjeta con `<div class="chart-container">` de altura mínima predefinida y empty state estético para futuro gráfico.
  5. **Últimos Movimientos**: lista compacta de 3 ítems mock diferenciando ingresos y gastos visualmente, con link "Ver historial completo" alineado a la derecha hacia `pages/resumen.html`.
- `base/styles/home.css`: creado con estilos específicos de la home (hero gradiente, métricas responsive, progress bar, achievements empty state, chart container, movimientos compactos). Mobile-first con breakpoints en 768px y 1024px.
- `base/styles/main.css`: actualizado para importar `home.css`.
- Filtros desplegables eliminados de la home (permanecen únicamente en `pages/simulador.html`).

### Completado (correcciones y mejoras posteriores)
- **Fix modo oscuro en Hero**: agregados overrides en `home.css` para `body.dark-mode .hero` usando tonos azules oscuros fijos (`#172554` → `#1e3a8a`) que mantienen contraste con el texto blanco y los botones claros.
- **Decoración lateral**: agregados pseudo-elementos `body::before` y `body::after` con radial-gradients difusos (`filter: blur(80px)`) en los laterales del viewport, usando `--brand-primary` y `--brand-accent` con opacidad sutil. Llenan el espacio vacío en pantallas anchas sin competir con el contenido.
- **Banner de cookies**: implementado en `index.html` con componente `.cookie-banner` fijo al pie, mensaje informativo sobre uso de localStorage/cookies, botón "Entendido" y persistencia en `localStorage` (`cookiesAccepted`). Lógica agregada en `base/scripts/main.js`.

### Pendiente (reservado para el equipo)
- Página `pages/market-rates.html`: contenido funcional de cotizaciones (fetch opcional).
- Assets (imágenes, iconos, datos JSON).
- Deploy funcional.

## 28 de mayo de 2026 (rama fix/simulator-ui-components)

### Estado General
Reparación de la página del simulador: funcionalidades rotas restauradas, dark mode equilibrado y Pesito integrado.

### Completado
- `pages/simulador.html`:
  - Eliminado fragmento de footer duplicado/roto al final del archivo.
  - Corregidas rutas de scripts de absolutas (`/base/scripts/...`) a relativas (`../base/scripts/...`).
  - Agregados scripts faltantes: `main.js` (dark mode, accesibilidad, menú usuario, logout), `footer.js` (footer desplegable), `pesito-brain.js` y `pesito-chat.js` (asistente virtual).
- `base/styles/simulator.css`: agregados overrides completos de `body.dark-mode`:
  - Fondo del body mantiene `#0f172a` (azul oscuro del sistema) igual que las demás páginas.
  - `#movement-form` (Registrar Movimiento): fondo oscuro manteniendo identidad cromática mint → `#3d5a52`.
  - `#savings-form` (Meta de Ahorro): fondo oscuro turquesa → `#2d4a4a`.
  - `.card-total` (Monto de Cuenta): fondo oscuro cyan → `#0c4a6e`.
  - Inputs, textareas, selects, botones, lista de movimientos y empty states adaptados para superficies oscuras.

## 28 de mayo de 2026 (sincronizacion simulador-home)

### Estado General
En desarrollo activo. Sincronización completa entre el simulador de movimientos y el dashboard de inicio.

### Completado
- Unificación de claves de `localStorage`: `local-storage.js` ahora usa `miniFinanceMovements` y `miniFinanceSavingsGoal`, alineándose con `state.js`.
- `simulator.js` refactorizado para usar funciones globales de `state.js` (`getMovements`, `saveMovements`, `getSavingsGoal`, `setSavingsGoal`, `getBalance`) en lugar de su propio sistema aislado.
- `pages/simulador.html`: agregado `<script src="../base/scripts/state.js"></script>` para exponer funciones financieras globales al simulador.
- `render.js`: nuevas funciones `renderSavingsGoal()` y `renderRecentMovements(limit = 5)` para el dashboard de inicio.
- `dom.js`: agregados selectores `savingsGoalDisplay`, `savingsProgressFill`, `savingsCurrent`, `savingsPercent` y `recentMovementsList`.
- `index.html`:
  - Eliminados datos hardcodeados de métricas y últimos movimientos.
  - Renombrado `#savings-goal` a `#savings-goal-display` para evitar conflicto con el input del simulador.
  - Lista de últimos movimientos ahora usa `#recent-movements-list` y arranca con empty state.
- `main.js`: `initFinancialApp()` ahora invoca `renderSavingsGoal()` y `renderRecentMovements(5)` al cargar.
- Todos los cambios copiados al worktree real del usuario en `D:/ALEJO/AleMart/Documents/IntegrarTEC/Proyecto1`.

### Pendiente
- Página `pages/market-rates.html`: contenido funcional de cotizaciones (fetch opcional).
- Assets (imágenes, iconos, datos JSON).
- Deploy funcional.

## Actualidad

### Completado
- Instalada skill `design-lab` utilizando `pnpm dlx skills add https://github.com/0xdesign/design-plugin --skill design-lab` para incorporar recursos de diseño.

## 28 de mayo de 2026 (pesito y footer global)

### Estado General
En desarrollo activo. Ajuste de comportamiento global del asistente virtual Pesito con el footer desplegable.

### Completado
- `base/styles/pesito.css`: corregido el posicionamiento desktop del chat para que no duplique `--footer-offset` cuando el footer de creditos esta abierto. El boton y la ventana del chat vuelven a mantener la misma separacion visual.
- `pages/simulador.html`: completado el bloque HTML de Pesito con cierre correcto del contenedor y agregado del boton flotante `#pesito-toggle`, dejando el asistente disponible en el simulador igual que en Inicio, Resumen y Cotizaciones.

### Pendiente
- Validacion visual manual en navegador de Inicio, Resumen, Cotizaciones y Simulador con footer abierto/cerrado.
