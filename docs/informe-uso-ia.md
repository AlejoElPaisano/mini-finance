# Informe de Uso de Inteligencia Artificial

## Consigna para el informe
El informe deberá tener una extension aproximada de 1 a 2 páginas y responder:

**1 ¿Qué herramientas de IA utilizaron?**
- OpenCode Agent (modelo Gemini 3.1 Pro Preview).
- OpenCode Agent con modelo Kimi 2.6 (en sesiones posteriores de desarrollo de funcionalidades financieras y autenticación).
- Skills especializadas integradas en el entorno: `frontend-design`, `interface-design`, `mobile-first-design`, y la skill personalizada `buenas-practica-mini-finance`.

**2 ¿Para qué las utilizaron?**
- Para refactorizar la arquitectura CSS usando un sistema de tokens, implementar un *footer* colapsable con persistencia de estado (`localStorage`), limpiar comentarios del código para cumplir restricciones del proyecto, corregir validaciones HTML y accesibilidad, y generar mensajes de commit en inglés.
- Para implementar herramientas de accesibilidad persistentes: modo dislexia con fuente OpenDyslexic y modo daltónico con paleta segura (Vermilion/Sky Blue), ambos con persistencia en `localStorage`.
- Para desarrollar el sistema de autenticación completo: página de login con tres vistas intercambiables (login, registro, recuperación de contraseña), validaciones de formularios, persistencia de usuarios en `localStorage` y auth guards en páginas protegidas.
- Para implementar los módulos financieros esenciales (`config.js`, `state.js`, `dom.js`, `render.js`, `events.js`) que permiten registrar ingresos y gastos, calcular saldos, filtrar movimientos y generar alertas visuales en el DOM.
- Para corregir problemas estructurales como HTML roto, footer parpadeante al navegar entre páginas, y restauración de lógica de accesibilidad perdida.
- Para documentar el proyecto mediante la redacción del README completo y la estructuración de este informe de uso de IA.
- Para crear y configurar el archivo `AGENTS.md` con instrucciones de contexto para futuras sesiones de OpenCode.
- Para desarrollar el Asistente Virtual Flotante "Pesito" con lógica de árbol de decisiones ("opciones guiadas"), animaciones y diseño responsivo Mobile-First con Bottom Sheet.
- Para diseñar desde cero avatares en formato SVG puro para la identidad visual del chatbot (moneda-cerdito) sin depender de imágenes externas o emojis.
- Para extender la integración del Asistente Virtual Flotante "Pesito" al resto de las páginas protegidas (`simulador.html`, `resumen.html`, `market-rates.html`), asegurando la consistencia de scripts y estructura HTML en toda la aplicación.
- Para validar directrices de la skill de "buenas prácticas", específicamente confirmando que la automatización de actualizaciones de contexto en `AGENTS.md` es una estrategia correcta.
- Para pulir la UI del simulador (rediseñar el efecto hover de las cards del formulario y scoparlo correctamente), corregir la superposición de notificaciones de logros con otros toasts, rediseñar el footer con el logo de marca, y preservar el color del borde izquierdo en el hover de los movimientos del home.
- Para automatizar la redacción iterativa de este informe de uso de IA a partir del análisis de las sesiones de chat.

**3 ¿Qué partes del proyecto fueron asistidas por IA?**
- Refactorización visual de la interfaz de usuario (HTML/CSS de `index.html`, `simulador.html`, `resumen.html`, `market-rates.html`).
- Lógica y comportamiento de componentes de la interfaz (`footer.js`).
- Estructura y arquitectura de estilos (`tokens.css`, `footer.css`).
- Sistema de autenticación completo (`pages/login.html`, `base/scripts/login.js`, `base/styles/login.css`).
- Herramientas de accesibilidad (`base/styles/accessibility.css`) con modos dislexia y daltónico.
- Módulos JavaScript financieros (`base/scripts/config.js`, `state.js`, `dom.js`, `render.js`, `events.js`).
- Integración de auth guards en el `<head>` de todas las páginas protegidas para redirigir a login si no hay sesión activa.
- Menú de usuario desplegable con opción de cerrar sesión, integrado en el header de las páginas protegidas.
- Dashboard dinámico con cálculos financieros en tiempo real (Total Ingresos, Total Gastos, Saldo Disponible).
- Lista de movimientos con estilos CSS diferenciados para ingresos (borde verde) y gastos (borde rojo).
- Alertas visuales obligatorias: detección automática de límite de gasto superado y meta de ahorro no alcanzada.
- Asistente Virtual Flotante completo (HTML semántico en `index.html`, estilos CSS en `pesito.css`, lógica de árbol en `pesito-brain.js` y comportamiento del chat en `pesito-chat.js`).
- Identidad visual SVG para el asistente (avatar principal en el chat y versión mini para el botón toggle).
- Documentación del proyecto (`README.md` y este informe).
- Contexto de desarrollo (creación de `AGENTS.md` para guiar interacciones futuras).
- Propagación del componente Asistente Virtual a las páginas secundarias y protección de su estructura mediante reglas inyectadas en `AGENTS.md`.
- Estilos CSS del simulador (`simulator.css`) para scopar el efecto hover degradado + glow únicamente en el formulario del simulador.
- Lógica de notificaciones (`achievements.js`) para evitar la superposición de toasts de logros con otros mensajes flotantes.
- Rediseño del footer (`footer.css` y HTML de todas las páginas) con logo grande de Mini Finance y sección de soporte.
- Corrección de hover en movimientos del home (`components.css`) para preservar los colores semánticos del borde izquierdo.
- Documentación técnica (`docs/informe-uso-ia.md`).

**4 ¿Qué prompts o consultas les resultaron mas útiles?**
- *"fijate que en el footer hay unos inconvenientes y es que por ejemplo en la seccion de 'Desarrollados por' Francisco esta apartado a la derecha, deberiamos estar los 3 juntos por una cuestion de mejor diseño..."* (Útil para refinar y corregir detalles estéticos).
- Pedir explícitamente a la IA que asuma el rol de "asistente de documentación técnica" siguiendo reglas estrictas.
- Solicitar la generación de títulos y descripciones estructuradas para *commits*.
- *"Implementa botones de accesibilidad para dislexia y daltonismo con persistencia en localStorage y clases CSS dinámicas."* (Útil para cumplir el desafío de accesibilidad).
- *"Desarrolla una página de login con tres vistas intercambiables sin recargar la página, usando JavaScript vanilla y localStorage."* (Base del sistema de autenticación).
- *"Implementa los módulos JavaScript financieros para registrar ingresos, gastos, calcular saldo y mostrar alertas visuales cuando se supere un límite de gasto o no se alcance una meta de ahorro."* (Desafío obligatorio de alertas visuales).
- *"Corrige el parpadeo del footer al navegar entre páginas; si el usuario lo tiene cerrado, debe permanecer cerrado."* (Corrección de comportamiento de UI).
- *"Create or update `AGENTS.md` for this repository. The goal is a compact instruction file that helps future OpenCode sessions avoid mistakes and ramp up quickly."* (Útil para establecer un archivo de contexto para agentes de IA).
- *"Queremos replicar la dinámica, el diseño y la experiencia de usuario de BOTI... Actuá como un experto en UX Writing financiero y redactá en un objeto de JavaScript un menú de árbol... Aplica estrictamente los criterios de nuestras skills... para que el componente sea moderno, responsivo y con microinteracciones pulidas."* (Fundamental para guiar el desarrollo de un componente interactivo complejo con una identidad clara).
- *"Me gustaria que el logo o diseño de pesito sea más aplicado a lo que es la página y su propio nombre, tal vez que pesito se una moneda con forma de dibujo animado"* (Útil para lograr un diseño SVG puro sin depender de assets externos).
- *"fijate que yo agregue en mi skill de buenas practicas que se actualice mi agents.md. Esta bien esto? Por otro lado, Basándote en nuestras skills locales, modificá los archivos necesarios para agregar la estructura y estilos de nuestro asistente flotante 'Pesito'."* (Útil para validar la arquitectura de IA del proyecto y propagar un componente complejo a través de múltiples archivos manteniendo consistencia).
- *"Actúa como mi asistente de documentación técnica. Estoy redactando el 'Informe de uso de Inteligencia Artificial'... Tu tarea es analizar toda la conversación que tuvimos en esta sesión actual y actualizar el documento Markdown en el proyecto siguiendo estrictamente estas reglas..."* (Útil para automatizar la redacción iterativa de documentación sin perder el historial previo).
- *"En el page del simulador cuando poner el mouse sobre el formulario, en la parte izquierda se genera como una linea azul, me gustaria que cambiemos ese diseño..."* (Útil para iterar sobre microinteracciones CSS sin perder la identidad visual existente).
- *"Cuando desbloqueamos un logro en el simulador, fijate que la notificacion del logro se superpone sobre la notificacion de 'Movimiento agregado'..."* (Útil para detectar y corregir conflictos de z-index y contenedores de UI dinámica).
- *"Me gusta el footer, pero siento que deberiamos darle un poco más de vida... podriamos poner en grande el logo de la pagina en grande a la izquierda..."* (Útil para reforzar la identidad visual de marca en el pie de página).
- *"En la pagina de inicio, en ultimos movimientos si pones el mouse arriba de un movimiento se pone en negro o se oscurece el diseño... quede el color, a la sumo hagamos algun diseño o algo para que se note que pasamos el mouse por arriba, pero que sea minimo."* (Útil para preservar consistencia visual de estados semánticos).
- *"Respecto al footer, tampoco tenemos que poner enlaces porque si ponemos en el footer inicio, simulador, resumen, etc esta mal ya que arriba tenemos la barra de navegación. No quiero que repitamos lo mismo."* (Útil para evitar redundancia de UI y mantener una arquitectura de información clara).

**5 ¿Qué respuestas de la IA tuvieron que corregir?**
- El diseño inicial del *footer* utilizaba una grilla (`grid-template-columns: 1fr 1fr`) que dividía a los miembros del equipo en dos columnas, dejando a uno de los integrantes desalineado a la derecha. Se tuvo que instruir a la IA para que lo corrigiera.
- La IA perdió la lógica de los botones de accesibilidad (dislexia y daltónismo) al reescribir `main.js`, dejando los botones sin funcionar. Se tuvo que restaurar manualmente la función `initAccessibility()`.
- La IA generó estructura HTML rota en las 4 páginas protegidas al intentar agregar el menú de usuario: faltaban cierres de `</nav>` y `</header>`, y el contenido del `<main>` se perdió o se mezcló. Se tuvo que reconstruir completamente los archivos.
- El footer tenía `class="app-footer open"` por defecto en el HTML, lo que causaba un parpadeo (flash de apertura) al cargar cada página antes de que el JS lo cerrara. Se quitó la clase `open` del HTML para dejar que el JS maneje el estado inicial dinámicamente.
- En una instancia, la IA ejecutó un `git commit` sin consultar previamente al equipo, lo cual violó el flujo de trabajo acordado. Esto requirió agregar una regla estricta en la skill de buenas prácticas para prohibir commits sin autorización explícita.
- La IA declaró el objeto del "cerebro" del chatbot con `const` en el scope global de un archivo, lo que en modo estricto impidió que el script secundario pudiera leerlo desde `window`. Se tuvo que corregir cambiando `const` por `var`.
- El diseño inicial del chatbot en versión mobile usaba un overlay que bajaba desde el borde superior de la pantalla. Se corrigió para que se comportara como un *Bottom Sheet* estándar subiendo desde abajo.
- El evento de clic en los botones del chatbot provocaba el cierre accidental del mismo debido a la propagación del evento (`event bubbling`) hacia el documento. Se corrigió agregando `event.stopPropagation()`.
- Al intentar actualizar la documentación interna (`arquitectura.md`), la herramienta de edición de la IA falló reiteradas veces por encontrar "múltiples coincidencias" del texto a reemplazar. Se tuvo que corregir proporcionando un bloque de contexto mucho más grande y específico para lograr la edición exacta.
- La IA aplicó el efecto de degradado + glow en `.card::before` globalmente en `components.css`, lo que afectó las cards del dashboard del home y cambió su diseño original. Se tuvo que revertir en `components.css` y scopar el efecto únicamente a `section.card` dentro de `simulator.css`.
- La IA propuso una sección "Enlaces" en el footer que incluía links a "Inicio", "Simulador", "Resumen" y "Cotizaciones", duplicando la navegación principal del header. Se tuvo que instruir para evitar la redundancia y reemplazarlo por una sección "Soporte" con links externos útiles.
- La IA sugirió `.movement-item:hover { border-color: var(--border-default); }` en `components.css`, lo que sobreescribía el color del borde izquierdo de los movimientos en el home (rojo/verde) y lo volvía gris. Se corrigió eliminando esa propiedad.

**6 ¿Qué problemas tuvieron al trabajar con IA?**
- La IA en ocasiones propone estructuras de *layout* que son correctas a nivel técnico, pero que estéticamente carecen de simetría o separan elementos que conceptualmente deberían estar agrupados. Fue necesario guiar a la IA en esos detalles visuales.
- La IA puede perder archivos o sobrescribir código existente cuando realiza múltiples cambios en paralelo o cuando se interrumpe el flujo de trabajo. Por ejemplo, `accessibility.css` y `login.js` se perdieron en una sesión y tuvieron que ser recreados.
- Al hacer ediciones parciales en archivos HTML complejos, la IA a veces corrompe la estructura (faltan cierres de etiquetas, se pierden secciones completas del `<main>`). Es indispensable verificar la estructura HTML completa después de cada modificación.
- La IA cometió el error de realizar un commit sin pedir permiso, lo que evidenció la necesidad de documentar reglas de flujo de trabajo directamente en las skills personalizadas.
- En una sesión hubo una confusión con el control de ramas de Git. La IA asumió estar en un branch temporal de OpenCode, lo que requirió intervención manual mediante comandos de terminal para eliminar el `worktree` y la rama sobrante, y así volver a la rama de features principal del equipo.
- Las herramientas automáticas de edición de texto exacto de la IA pueden fallar si el código objetivo está duplicado o tiene una estructura repetitiva (como listas de imports), requiriendo reintentos y mayor precisión de contexto.
- La IA no detectó automáticamente que un cambio en `.card::before` (clase genérica) afectaría a múltiples componentes en diferentes páginas. El equipo tuvo que verificar visualmente el impacto en el home y dar instrucciones para scopar el cambio.
- La IA propuso agregar navegación interna en el footer sin considerar que ya existía una barra de navegación principal, generando redundancia de UI.
- Al intentar automatizar la actualización de documentación, la IA inicialmente leyó una versión desactualizada del informe desde el worktree interno de OpenCode en lugar del worktree real del usuario, lo que requirió lectura explícita de la ruta correcta.

**7 ¿Qué aprendieron durante el proceso?**
- La importancia de realizar revisiones manuales y visuales de la interfaz en lugar de aceptar ciegamente el código generado. El criterio estético humano sigue siendo indispensable para notar asimetrías o malas decisiones de diseño.
- Un sistema de tokens CSS bien definido acelera todo el desarrollo posterior y mantiene la consistencia visual en toda la aplicación.
- Modularizar JavaScript en archivos con responsabilidad única (`config`, `state`, `dom`, `render`, `events`, `main`) facilita enormemente el mantenimiento y el debugging.
- Separar la lógica de estado (cálculos y persistencia) del renderizado (pintar en pantalla) y de los eventos (interacción del usuario) mejora la arquitectura y permite testear cada parte de forma aislada.
- Documentar reglas estrictas de flujo de trabajo (como "prohibido commit sin permiso") directamente en las skills personalizadas previene errores de procedimiento.
- Verificar siempre la estructura HTML completa después de ediciones parciales, ya que los cierres de etiquetas son propensos a romperse.
- Configurar que las skills actualicen automáticamente archivos de contexto global (como `AGENTS.md`) es una excelente práctica para asegurar que futuras sesiones de IA hereden restricciones y reglas técnicas sin depender de la memoria del usuario.
- Verificar el alcance (scope) de los cambios CSS en clases genéricas antes de aplicarlos, ya que `.card` se usa en múltiples contextos con diseños distintos.
- Evitar redundancia de navegación: el footer no debe duplicar la función del header/navbar.
- Los cambios de hover deben respetar el sistema de colores semánticos existente (rojo para gastos, verde para ingresos) y no neutralizarlos.
- La automatización de documentación técnica a partir de sesiones de chat es viable pero requiere asegurar que se lee el archivo fuente correcto.

**8 ¿Qué partes del código puede explicar cada integrante?**

**9 ¿Qué decisiones tomo el grupo sin depender de la IA?**
- La decisión sobre cómo presentar y agrupar visualmente los nombres de los integrantes del equipo en el pie de página, priorizando un buen diseño estético por encima de la maquetación de dos columnas sugerida.
- Decisión de que el login sea la puerta de entrada obligatoria: todas las páginas protegidas deben redirigir a `pages/login.html` si no hay sesión activa (`miniFinanceSession`).
- Decisión de integrar un menú de usuario desplegable (icono 👤) en el header en lugar de un botón de logout directo, para mantener la interfaz limpia.
- Decisión de mantener el dark mode en la página de login con modo oscuro por defecto, permitiendo al usuario alternar si lo desea.
- Decisión de agregar un campo de **monto** (`type="number"`) al formulario del simulador, ya que la estructura original no incluía este campo esencial para registrar transacciones financieras.
- Decisión de usar **Conventional Commits** para todos los mensajes de commit, estableciendo un patrón consistente en todo el proyecto.
- Decisión de que los datos financieros (movimientos, metas) sean globales y no estén aislados por usuario, simplificando la arquitectura para el alcance del proyecto.
- La decisión proactiva de incluir una directriz explícita en la skill de "buenas prácticas" para obligar a la IA a actualizar de forma autónoma el archivo `AGENTS.md` cuando se introduzcan nuevas piezas clave (como el asistente virtual).
- Decisión de mantener el diseño original de las cards del home (línea azul simple) y scopear el nuevo efecto visual (degradado + glow) únicamente al simulador.
- Decisión de no incluir links de navegación interna en el footer para evitar redundancia con la barra de navegación superior.
- Decisión de reemplazar la sección "Proyecto"/"Enlaces" del footer por "Soporte", manteniendo solo el link al repositorio y agregando un link para reportar bugs.
- Decisión de preservar el color del borde izquierdo en los items de "últimos movimientos" al hacer hover, optando por un efecto mínimo de sombra y levantamiento en lugar de cambiar el borde.

**10 ¿Hubo código sugerido por IA que descartaron? ¿Por qué?**
- Sí, se descartó el bloque de código CSS `.footer__team { display: grid; grid-template-columns: 1fr 1fr; }` sugerido inicialmente por la IA. Se descartó porque generaba una asimetría indeseada y fue reemplazado por un diseño de caja flexible en columna (`flex-direction: column`).
- Se descartó la estructura HTML parcialmente corrupta que la IA generó al intentar integrar el menú de usuario en las 4 páginas protegidas. Faltaban cierres de etiquetas y se perdió contenido del `<main>`. Se reescribieron los archivos completamente desde cero.
- Se descartó un commit realizado automáticamente por la IA sin consulta previa. Aunque el código era correcto, el procedimiento violó el flujo de trabajo del equipo. Se estableció una regla estricta en la skill para prevenir que esto vuelva a ocurrir.
- Se descartó la idea inicial de mostrar el botón de logout directamente en la barra de navegación. Se optó por un menú desplegable de usuario (👤) para mantener la interfaz más limpia y profesional.
- Se descartaron los diseños iniciales propuestos para el botón flotante del asistente, ya que usaban emojis genéricos (🐷 y 💬). Se exigió y adoptó en su lugar la generación de un SVG inline con el diseño de una "moneda de oro" para mantener la identidad visual financiera del proyecto.
- Se descartó el efecto de `.card::before` con degradado + glow aplicado globalmente en `components.css`, porque alteró el diseño establecido del dashboard del home. Fue reemplazado por una regla scopada en `simulator.css`.
- Se descartó la sección "Enlaces" del footer con links a Inicio, Simulador, Resumen y Cotizaciones, porque duplicaba la navegación principal. Fue reemplazada por "Soporte".
- Se descartó la propiedad `border-color: var(--border-default)` del hover de `.movement-item`, porque neutralizaba el color semántico del borde izquierdo (verde/rojo).
