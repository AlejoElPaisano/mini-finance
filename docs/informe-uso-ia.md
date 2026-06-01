# Informe de Uso de Inteligencia Artificial

## Consigna para el informe
El informe deberá tener una extension aproximada de 1 a 2 páginas y responder:

**1 ¿Qué herramientas de IA utilizaron?**
- OpenCode Agent (modelo Gemini 3.1 Pro Preview).
- OpenCode Agent con modelo Kimi 2.6 (en sesiones posteriores de desarrollo de funcionalidades financieras y autenticación).
- Skills especializadas integradas en el entorno: `frontend-design`, `interface-design`, `mobile-first-design`, y la skill personalizada `buenas-practica-mini-finance`.
- Claude Code con modelo Opus 4.8
-  Claude Sonnet 4.6

**2 ¿Para qué las utilizaron?**
- Para refactorizar la arquitectura CSS usando un sistema de tokens, implementar un *footer* colapsable con persistencia de estado (`localStorage`), limpiar comentarios del código para cumplir restricciones del proyecto, corregir validaciones HTML y accesibilidad, y generar mensajes de commit en inglés.
- Para implementar herramientas de accesibilidad persistentes: modo dislexia con fuente OpenDyslexic y modo daltónico con paleta segura (Vermilion/Sky Blue), ambos con persistencia en `localStorage`.
- Para desarrollar el sistema de autenticación completo: página de login con tres vistas intercambiables (login, registro, recuperación de contraseña), validaciones de formularios, persistencia de usuarios en `localStorage` y auth guards en páginas protegidas.
- Para implementar los módulos financieros esenciales (`config.js`, `state.js`, `dom.js`, `render.js`, `events.js`) que permiten registrar ingresos y gastos, calcular saldos, filtrar movimientos y generar alertas visuales en el DOM.
- Para corregir problemas estructurales como HTML roto, footer parpadeante al navegar entre páginas, y restauración de lógica de accesibilidad perdida.
- Para crear y configurar el archivo `AGENTS.md` con instrucciones de contexto para futuras sesiones de OpenCode.
- Para desarrollar el Asistente Virtual Flotante "Pesito" con lógica de árbol de decisiones ("opciones guiadas"), animaciones y diseño responsivo Mobile-First con Bottom Sheet.
- Para extender la integración del Asistente Virtual Flotante "Pesito" al resto de las páginas protegidas (`simulador.html`, `resumen.html`, `market-rates.html`), asegurando la consistencia de scripts y estructura HTML en toda la aplicación.
- Para validar directrices de la skill de "buenas prácticas", específicamente confirmando que la automatización de actualizaciones de contexto en `AGENTS.md` es una estrategia correcta.
- Para pulir la UI del simulador (rediseñar el efecto hover de las cards del formulario y scoparlo correctamente), corregir la superposición de notificaciones de logros con otros toasts, rediseñar el footer con el logo de marca, y preservar el color del borde izquierdo en el hover de los movimientos del home.
- Diseñar e implementar lo central y principal de la website page Resumen, con enfoque en vista, renderizados dinamicos, contenedores con grillas, estilados y funcionalidades, conservando la estatica de homebanking frío. Con lo cual, basicamente, se inovo con 4 estructuras de cards financieras (Ingreso | Gastos | Sumatoria de Metas de Ahorro | Balance de Movimientos) y con un ledger con columnas alineadas al tipico estilado de extracto bancario.
- Diagnosticar y resolver un `SyntaxError: Unexpected token 'export'`
  causado por `state.js` mezclando sintaxis ES module con carga
  como classic script en `index.html`.
- Refactorizar `base/scripts/resumen` para eliminar las siguientes cuestiones: el metodo `innerHTML`, operados ternarios anidados y construcción de HTML con template strins ; remplazando respectivamente con `<template>` clonado, `appendChild` y `textContent`
- Aislar tokens de tematización( `--bg-theme-header`, `--bg-theme-card` , `--bg-theme-footer`, el background del `main` y del `body`) para que se aplique únicamente en modo claro sin tocar el comportamiento existente del modo oscuro
- Se usó principalmente para dos cosas: entender cómo trabajar correctamente con Git y GitHub durante el proyecto, y para orientarse en la integración de APIs externas dentro de Cotizaciones. Mayormente se usó como apoyo en partes puntuales donde se necesitaba guía técnica, exceptuando momentos específicos donde sí se necesitaba soporte con el código.

**3 ¿Qué partes del proyecto fueron asistidas por IA?**
- Refactorización visual de la interfaz de usuario (HTML/CSS de `index.html`, `simulador.html`, `resumen.html`, `market-rates.html`).
- Lógica y comportamiento de componentes de la interfaz (`footer.js`).
- Estructura y arquitectura de estilos (`tokens.css`, `footer.css`).
- Sistema de autenticación completo (`pages/login.html`, `base/scripts/login.js`, `base/styles/login.css`).
- Herramientas de accesibilidad (`base/styles/accessibility.css`) con modos dislexia y daltónico.
- Módulos JavaScript financieros (`base/scripts/config.js`, `state.js`, `dom.js`, `render.js`, `events.js`).
- Integración de auth guards en el `<head>` de todas las páginas protegidas para redirigir a login si no hay sesión activa.
- Dashboard dinámico con cálculos financieros en tiempo real (Total Ingresos, Total Gastos, Saldo Disponible).
- Alertas visuales obligatorias: detección automática de límite de gasto superado y meta de ahorro no alcanzada.
- Asistente Virtual Flotante completo (HTML semántico en `index.html`, estilos CSS en `pesito.css`, lógica de árbol en `pesito-brain.js` y comportamiento del chat en `pesito-chat.js`).
- Propagación del componente Asistente Virtual a las páginas secundarias y protección de su estructura mediante reglas inyectadas en `AGENTS.md`.
- Lógica de notificaciones (`achievements.js`) para evitar la superposición de toasts de logros con otros mensajes flotantes.
- Corrección de hover en movimientos del home (`components.css`) para preservar los colores semánticos del borde izquierdo.
- `base/scripts/resumen.js` — lógica de la page de Resumen,
  (ComputeTotals, RenderDashboard, ledger render con template,
  filtros, listener `storage` para sync entre pestañas) desde el .el array de objetos vinculado Storage, para plamar todos los movimientos.
- `base/scripts/labels.js` — archivo nuevo que aloja `TYPE_LABELS`,
  `CATEGORY_LABELS`, `SIGN_BY_TYPE` para que `state.js` pueda
  cargarse como classic script sin romper.
- `pages/resumen.html` — estructura del dashboard de cards + ledger
  con `<aside class="ledger-head">`, `<ol class="ledger-list">`
  y `<template id="ledger-row-template">`.
- `base/styles/tokens.css` — nuevas variables light-only con override
  en `body.dark-mode { --bg-light-X: var(--bg-surface) }`.
- `base/scripts/main.js` — guard `typeof initAchievementButton ===
  'function'` para que `main.js` no reviente en páginas que no
  cargan `achievements.js`.
-En la sección de Cotizaciones, específicamente ayudó a:
    .Entender cómo hacer un fetch a una API externa y manejar la respuesta
    .Decidir qué APIs usar (CoinGecko para cripto, exchangerate-api.com para divisas) y por qué cada una era viable
    .Manejar errores de red mostrando mensajes en el DOM
    .Entender el flujo de trabajo con ramas en Git, cómo hacer commits más estratégicos, uso correcto de push, etc.

**4 ¿Qué prompts o consultas les resultaron mas útiles?**
- "Implementa botones de accesibilidad para dislexia y daltonismo con persistencia en localStorage y clases CSS dinámicas."
- "Desarrolla una página de login con tres vistas intercambiables sin recargar la página, usando JavaScript vanilla y localStorage." 
- "Implementa los módulos JavaScript financieros para registrar ingresos, gastos, calcular saldo y mostrar alertas visuales cuando se    supere un límite de gasto o no se alcance una meta de ahorro."
- "Queremos replicar la dinámica, el diseño y la experiencia de usuario de BOTI... Actuá como un experto en UX Writing financiero y redactá en un objeto de JavaScript un menú de árbol... Aplica estrictamente los criterios de nuestras skills... para que el componente sea moderno, responsivo y con microinteracciones pulidas."
- "Pulime esto, no quiero operadores ternarios anidados. Quiero que
  uses appendChild nunca innerHTML — si es necesario editá lo mínimo
  el HTML para no tener HTML mediante \`\` en el .js."
- "Quiero que estos cambios donde aplique var(--bg-light-header) y
  var(--bg-light-card) se apliquen únicamente cuando el website está
  en modo claro. Fijate bien, quiero que tematica oscura funcione
  igual que antes."
- Las consultas más útiles fueron las que describían el problema concreto y se analizaban las herramientas para desarrolladores, en lugar de generar código estático. Por sobre todo consultar el flujo de Git antes de ejecutar comandos, para entender qué se estaba haciendo en cada paso.


**5 ¿Qué respuestas de la IA tuvieron que corregir?**
- El diseño inicial del *footer* utilizaba una grilla (`grid-template-columns: 1fr 1fr`) que dividía a los miembros del equipo en dos columnas, dejando a uno de los integrantes desalineado a la derecha.
- La IA perdió la lógica de los botones de accesibilidad (dislexia y daltónismo) al reescribir `main.js`, dejando los botones sin funcionar. Se tuvo que restaurar manualmente la función `initAccessibility()`.
- La IA generó estructura HTML roto en las 4 páginas protegidas al intentar agregar el menú de usuario: faltaban cierres de `</nav>` y `</header>`, y el contenido del `<main>` se perdió o se mezcló.
- El footer tenía `class="app-footer open"` por defecto en el HTML, lo que causaba un parpadeo (flash de apertura) al cargar cada página antes de que el JS lo cerrara.
- En una instancia, la IA ejecutó un `git commit` sin consultar previamente, lo cual rompio el flujo de trabajo acordado. Esto requirió agregar una regla estricta en la skill de buenas prácticas para prohibir commits sin autorización explícita.
- El diseño inicial del chatbot en versión mobile usaba un overlay que bajaba desde el borde superior de la pantalla. Se corrigió para que se comportara como un *Bottom Sheet* estándar subiendo desde abajo.
- El evento de click en los botones del chatbot provocaba el cierre accidental del mismo debido a la propagación del evento (`event bubbling`) hacia el documento.
- La IA propuso una sección "Enlaces" en el footer que incluía links a "Inicio", "Simulador", "Resumen" y "Cotizaciones", duplicando la navegación principal del header. Se tuvo que instruir para evitar la redundancia y reemplazarlo por una sección "Soporte" con links externos útiles.
- Primera versión de `resumen.css` usó BEM con `__` (` ledger-row__date`,`.ledger-row__amount`) pero el HTML del proyecto usa guion simple (`.ledger-row-date`, `.ledger-row-amount`) → las filas se renderizaron sin estilo (sin alineación derecha del monto, sin tabular-nums, sin colores por tipo). Hubo que renombrar todos los selectores.
- Cuando apareció el `SyntaxError` por `export` en `state.js`, una solución intermedia fue convertir todos los scripts de `index.html` a `type="module"`. Eso "arregló" el syntax error pero rompió todas las funciones globales compartidas entre los scripts clásicos (`getMovements`, `getBalance`, `renderDashboard`, etc.), con cascada de ReferenceErrors. Hubo que retrotraer y aplicar la solución correcta: extraer los `export` a un archivo nuevo (`labels.js`) y dejar `state.js` puramente classic.
- En el primer pase del refactor de `resumen.js`, `replaceChildren()` estaba mal escrito como `replaceChild()` (firma distinta), y un guard de early-return estaba invertido (`if ($filterCategory) return` en lugar de `if (!$filterCategory) return`).
- Hubo varias iteraciones con las APIs. La IA inicialmente sugirió usar frankfurter.app para las tasas de cambio en tiempo real, pero desde localhost esa API bloqueaba las requests. Se tuvo que buscar una alternativa (exchangerate-api.com) que sí funcionara. También se intentó usar el endpoint de historial por fecha de esa misma API, que tampoco estaba disponible en el tier gratuito. Esos problemas se fueron resolviendo en el proceso, probando y ajustando.

**6 ¿Qué problemas tuvieron al trabajar con IA?**
- La IA puede perder archivos o sobrescribir código existente cuando realiza múltiples cambios en paralelo o cuando se interrumpe el flujo de trabajo. Por ejemplo, `accessibility.css` y `login.js` se perdieron en una sesión y tuvieron que ser recreadas.
- Al hacer ediciones parciales en archivos HTML complejos, la IA a veces corrompe la estructura (faltan cierres de etiquetas, se pierden secciones completas del `<main>`).
- La IA cometió el error de realizar un commit sin pedir permiso, por lo que nos vimos en la necesidad de documentar reglas de flujo de trabajo directamente en la skill de buenas practicas.
- En una sesión hubo una confusión con el control de ramas de Git. La IA asumió estar en un branch temporal de OpenCode, lo que requirió intervención manual mediante comandos de terminal para eliminar el `worktree` y la rama sobrante, y así volver a la rama de features principal.
- La IA propuso agregar navegación interna en el footer sin considerar que ya existía una barra de navegación principal, generando redundancia de UI.
- La IA aseguró que una función "nunca se declara" cuando en realidad sí estaba declarada en otro archivo (`initAchievementButton` en `achievements.js`), solo que ese archivo no se carga en todas las páginas. Hubo que aclarar la diferencia entre "no está en scope en esta página" vs "no existe en el codebase".
- La IA propuso atajos drásticos (convertir TODO a modules) frente a errores acotados que admitían soluciones quirúrgicas.
El principal problema fue que la IA tendía a sugerir soluciones que implicaban desarrollo backend, como crear un servidor intermediario para manejar las requests a las APIs. Eso estaba fuera del alcance del proyecto. Una vez que se le dio más contexto con Skills, las sugerencias se volvieron más acotadas y útiles. También hubo problemas puntuales con APIs que fallaban desde localhost o cuyos endpoints de historial no estaban disponibles en el plan gratuito, lo que requirió buscar alternativas.


**7 ¿Qué aprendieron durante el proceso?**
- La importancia de realizar revisiones manuales y visuales de la interfaz en lugar de aceptar ciegamente el código generado. 
- Un sistema de tokens CSS bien definido acelera todo el desarrollo y mantiene la consistencia visual en toda la aplicación.
- Modularizar JavaScript en archivos con responsabilidad única (`config`, `state`, `dom`, `render`, `events`, `main`) facilita enormemente el mantenimiento y el debugging.
- Documentar reglas estrictas de flujo de trabajo (como "prohibido commit sin permiso") directamente en las skills personalizadas previene errores de procedimiento.
- Verificar siempre la estructura HTML completa después de ediciones parciales.
- Configurar que las skills actualicen automáticamente archivos de contexto global (como `AGENTS.md`) para asegurar que futuras sesiones de IA hereden restricciones y reglas técnicas sin depender de la memoria del usuario.
- `body:not(.dark-mode) <selector>` es el patrón más limpio para estilos exclusivos del tema claro: no requiere overrides en dark ni duplicar reglas.
- Para tokens reutilizables (colores, opacidades), conviene definirlos en `:root` y redefinirlos en `body.dark-mode` apuntando a la variable equivalente del modo oscuro (`--bg-light-card: var(--bg-surface)`). Así un solo nombre de token sirve para ambos modos sin acoplar selectores. - En vez de la sintaxis Tailwind `bg-opacity: 80%`, en CSS nativo se usa `rgb(R G B / 80%)` o `color-mix(in srgb, var(--token) 80%, transparent)`. Usar `opacity` afecta también a los hijos y rara vez es lo que se quiere. - Los pseudo-elementos `body::before/::after` con `filter: blur()` generan halos visuales que pueden confundirse con el background real del body — útil identificarlos al diagnosticar inconsistencias de tono entre lateral y contenido central.
- Se aprendió que antes de elegir una API hay que verificar tres cosas: que sea gratuita, que tenga CORS abierto para usarla desde el navegador, y que los endpoints necesarios estén disponibles sin registro. También se aprendió a trabajar con ramas en Git de forma más ordenada, a escribir commits descriptivos y a no mezclar cambios de distintas funcionalidades en un mismo commit.

**8 ¿Qué partes del código puede explicar cada integrante?**
- *Alejo Martinez:* Podria explicar la estructura y maquetación de la página de inicio (`index.html` y estilos asociados), el desarrollo y lógica del Asistente Virtual Flotante "Pesito" (`pesito-brain.js`, `pesito-chat.js`), la implementación del footer general, la lógica de estado y persistencia de las herramientas de accesibilidad (botones de dislexia y daltonismo), y el sistema completo de inicio de sesión (`login.js`, vistas de autenticación).
- *Francisco Chiressi:* Puede explicar el page completo de Resumen lo que conlleva estructura completa con HTML semantico, detallando sus ledger, la lógica de resumen.js junto a los respectivos helpers, el uso de local storage para el encapsulamiento y aplicación de movimientos y metas de ahorro y el respectivo estilo con colorida clasificación. A su vez, puede explicar lo mismo de la page de Simulator. Como también, el toque final de la implementación de tematica oscura y clara para el website.
- *Karen Ledesma:* La sección de Cotizaciones:
    .market-rates.html: la estructura semántica de la página, el formulario de divisas con sus labels, selects e inputs, y cómo se conecta con el JS mediante IDs
    .market-rates.js: cómo funciona el fetch a CoinGecko para traer los precios de cripto, cómo se renderizan las tarjetas dinámicamente en el DOM, cómo funciona la validación del formulario mostrando errores sin alert(), y cómo fetchForexRate obtiene la tasa real desde exchangerate-api.com
    .market-rates.css: las variables de tokens.css reutilizadas para mantener coherencia con el resto del proyecto, y las media queries que adaptan el layout en mobile

**9 ¿Qué decisiones tomo el grupo sin depender de la IA?**
- Decisión de que el login sea la puerta de entrada obligatoria: todas las páginas protegidas deben redirigir a `pages/login.html` si no hay sesión activa (`miniFinanceSession`).
- Decisión de integrar un menú de usuario desplegable (icono 👤) en el header en lugar de un botón de logout directo, para mantener la interfaz limpia.
- Decisión de mantener el dark mode en la página de login con modo oscuro por defecto, permitiendo al usuario alternar si lo desea.
- Decisión de que los datos financieros (movimientos, metas) sean globales y no estén aislados por usuario, simplificando la arquitectura para el alcance del proyecto.
- La decisión proactiva de incluir una directriz explícita en la skill de "buenas prácticas" para obligar a la IA a actualizar de forma autónoma el archivo `AGENTS.md` cuando se introduzcan nuevas piezas clave (como el asistente virtual).
- Decisión de reemplazar la sección "Proyecto"/"Enlaces" del footer por "Soporte", manteniendo el link al repositorio, un link para reportar bugs y una sección para comunicarse con nosotros.
- El elegir el slider con 2 escalas distintas, una de ellas en sintonia con el corriente Monto Total Disponible
- Definir que se pueda definir una unica meta de ahorro a la vez, pero que igualmente se puedan visualizar la sumatoria de todas las metas de ahorro hecha por el usuario.
- Definir a groso modo, los colores para ambas tematicas (clara y oscura)
- Definir las categorias a para la clasificación de movimientos.
Las decisiones estructurales del proyecto fueron tomadas en grupo desde el principio: la elección de la idea, la distribución de secciones entre los integrantes, la paleta de colores, la tipografía y la identidad visual general del sitio. A medida que el proyecto fue avanzando también surgieron decisiones sobre cómo organizar los archivos, qué funcionalidades priorizar, cómo manejar los estados de error visualmente y qué tan compleja hacer cada sección. Esas decisiones se fueron tomando en conjunto según cómo evolucionaba el proyecto, sin consultar a la IA.

**10 ¿Hubo código sugerido por IA que descartaron? ¿Por qué?**
- Se descartó la estructura HTML parcialmente corrupta que la IA generó al intentar integrar el menú de usuario en las 4 páginas protegidas. Faltaban cierres de etiquetas y se perdió contenido del `<main>`. Se reescribieron los archivos completamente desde cero.
- Se descartó un commit realizado automáticamente por la IA sin consulta previa. Se estableció una regla estricta en la skill para prevenir que esto vuelva a pasar.
- Se descartó la idea inicial de mostrar el botón de logout directamente en la barra de navegación. Se optó por un menú desplegable de usuario (👤) para mantener la interfaz más limpia y profesional.
- Se descartaron los diseños iniciales propuestos para el botón flotante del asistente, ya que usaban emojis genéricos. Se exigió y adoptó en su lugar la generación de un SVG inline con el diseño de una "moneda de oro" para mantener la identidad visual financiera del proyecto.
- Convertir todos los `<script>` de `index.html` a `type="module"` para resolver el SyntaxError de `state.js`: rompía globals compartidos entre scripts clásicos. Se reemplazó por la solución acotada de mover los `export` a `labels.js`. - Selectores CSS con BEM `__` para el ledger: incompatibles con la convención guion-simple ya establecida en el HTML del proyecto.
- Se descartaron principalmente sugerencias que implicaban desarrollar lógica de backend, como crear servidores intermediarios o manejar autenticación de APIs desde el servidor, cosas que estaban fuera del alcance del proyecto. También hubo sugerencias de implementaciones más complejas de lo necesario que se tuvieron que simplificar para mantenerlas dentro de lo que el proyecto requería. En algún caso puntual también se descartaron integraciones con APIs que en la práctica no funcionaban como se esperaba, y se optó por alternativas más simples que sí cumplían el objetivo.

