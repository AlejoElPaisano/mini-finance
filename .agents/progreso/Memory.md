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

## Funcionalidades Completadas

- Estructura base del proyecto (carpetas, reset, tokens, layout, navegacion semantica).
- Sincronizacion completa entre dashboard (`index.html`) y simulador (`pages/simulador.html`) via `state.js`.
- Sistema de autenticacion con login, registro, recuperacion y auth guard en todas las paginas protegidas.
- Modulos financieros implementados: `config.js`, `state.js`, `dom.js`, `render.js`, `events.js`, `main.js`.
- Cumplimiento del desafio obligatorio: alertas visuales en el DOM para limite de gasto y meta de ahorro.
- Asistente virtual "Pesito" integrado en todas las paginas protegidas (`pesito-brain.js`, `pesito-chat.js`).
- Reconstruccion de la home con 5 bloques: Hero, Metricas Clave, Panel de Logros, Distribucion de Gastos y Ultimos Movimientos.
- Dashboard: Distribucion de Gastos con insight de categoria mayor y barras de progreso por categoria (Vanilla CSS/JS).
- Orden cronologico inverso y limite de 5 movimientos en Inicio y Simulador.
- Meta de Ahorro: visualizacion adaptativa (% o $) segun modo configurado en el simulador.
- Fix: boton Limpiar del formulario del simulador funcional.
- Dark mode global y herramientas de accesibilidad (dislexia, daltonismo) en header.
- Footer desplegable tipo cajon con persistencia de estado.
- Banner de cookies con aceptacion y persistencia en `localStorage`.
- Documentacion completa: `README.md` e `informe-uso-ia.md`.
- Skill de buenas practicas actualizada con reglas estrictas de Git y automatizacion de contexto.
- Skills adicionales instaladas: `frontend-design`, `mobile-first-design`, `design-lab`, `trello-sync`.
- Footer reestructurado: logo y marca en fila horizontal, copyright actualizado y boton "Contáctanos".
- Modal de contacto funcional (nombre, apellido, email, mensaje) con validacion y mensaje de exito en el DOM.
- Pesito contextualizado para pagina de Resumen (`pesitoBrainResumen`).

## Pendiente

- Pagina `pages/market-rates.html`: contenido funcional de cotizaciones (fetch opcional).
- Assets (imagenes, iconos, datos JSON).
- Deploy funcional.
