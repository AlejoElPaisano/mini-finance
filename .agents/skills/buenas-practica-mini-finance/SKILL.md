---
name: buenas-practica-mini-finance
description: Skill especializada para construir, revisar y documentar el Proyecto Integrador Web Estática IntegrarTEC 2026, Idea 5 Mini Finance. Usar cuando se trabaje en HTML semántico, CSS responsive, JavaScript vanilla, DOM, arrays, objetos, localStorage, estructura modular, Git/GitHub, README, informe de IA, deploy o validación contra la consigna oficial y los contenidos de clase.
---

# Mini Finance IntegrarTEC

Usar esta skill para ayudar a desarrollar el proyecto integrador Mini Finance con HTML, CSS y JavaScript vanilla, respetando la consigna oficial y los contenidos trabajados en clase.

## Objetivo

Construir un sitio web estático, funcional, navegable, responsive e interactivo para registrar ingresos, gastos y metas de ahorro. El usuario debe poder visualizar saldo, gastos por categoría, progreso de ahorro y alertas visuales cuando supere un límite de gasto o no alcance su meta.

## Reglas obligatorias

- Usar HTML, CSS y JavaScript vanilla.
- No usar Bootstrap, Tailwind, React, Vue, Angular, Svelte, Astro, Next.js, Nuxt ni plantillas que resuelvan la estructura principal.
- Crear mínimo 3 documentos HTML navegables.
- Usar CSS propio y media queries.
- Implementar mínimo 3 funcionalidades reales de JavaScript.
- Usar `localStorage` o `sessionStorage` con datos relevantes.
- Mostrar mensajes en el DOM, no con `alert()` o `prompt()`.
- Preparar README, informe de IA, repositorio público, ramas `main` y `develop`, Conventional Commits y deploy funcional.

## Estructura recomendada

/
├─ index.html
├─ pages/
│  ├─ simulador.html
│  └─ resumen.html
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
└─ README.md

## Instrucciones para HTML
Escribir HTML como estructura semántica, no como decoración.

Cada página debe tener:

<!DOCTYPE html>.
<html lang="es">.
<meta charset="UTF-8">.
<meta name="viewport" content="width=device-width, initial-scale=1.0">.
Un único <h1> por página.
Jerarquía correcta de títulos sin saltos incoherentes.
Uso de header, nav, main, section, article, footer y form cuando corresponda.
Navegación real entre documentos HTML.
Rutas relativas correctas.
Imágenes con alt útil cuando correspondan.
Formularios con label asociado mediante for e id.
Botones reales con <button>, no div clickeables.
Inputs con tipos adecuados: text, number, date, email, etc.
Preferir HTML nativo antes que ARIA. Usar ARIA solo cuando HTML nativo no alcance, por ejemplo aria-live para zonas de mensajes dinámicos o aria-invalid en campos con error.

## Instrucciones para CSS
Usar CSS moderno, propio y organizado.

Aplicar:

box-sizing: border-box global.
Variables CSS en tokens.css.
Flexbox para componentes de una dimensión.
Grid para layouts de página o grillas de cards.
Media queries obligatorias para mobile y desktop.
Transiciones simples con propósito.
Estados visibles de foco, hover, error y éxito.
Contraste legible.
Espaciados consistentes.
No alcanza con achicar el diseño. En responsive debe cambiar la distribución: columnas, navegación, formularios, cards, tablas o métricas deben reorganizarse para pantallas chicas.

Usar esta regla de decisión:

Flexbox para navbar, botones agrupados, formularios simples y alineaciones internas.
Grid para dashboard, cards de resumen, layout principal y columnas de métricas.

## Instrucciones para JavaScript
Escribir JavaScript claro, modular y explicable.

Usar:

const por defecto y let solo cuando el valor cambie.
Funciones pequeñas con nombres claros.
Igualdad estricta ===.
Template literals cuando mejoren legibilidad.
Validaciones antes de guardar datos.
Conversión explícita de montos con Number().
Mensajes visibles modificando el DOM.
addEventListener, no handlers inline en HTML.
textContent para texto simple.
innerHTML solo cuando sea necesario y con datos controlados.
classList para estados visuales.
Evitar:

Código mezclado sin módulos.
Variables globales innecesarias.
Lógica financiera dentro del render.
Repetición de selectores.
console.log() como funcionalidad.
alert() como validación principal.


## Modelo de datos recomendado
Representar los movimientos como arreglo de objetos:
const movement = {
  id: crypto.randomUUID(),
  type: "income",
  description: "Sueldo",
  amount: 250000,
  category: "trabajo",
  date: "2026-05-20"
};

Usar arrays para listas de movimientos y objetos para representar entidades con propiedades.

Aplicar métodos de arrays según necesidad:

push para agregar movimientos.
filter para filtrar por categoría o eliminar por id.
find para buscar un movimiento.
map para transformar datos antes de renderizar.
reduce para calcular ingresos, gastos, saldo y totales por categoría.
some o every para validar condiciones generales.

## Módulos JavaScript
config.js:
Guardar constantes, categorías, claves de storage y límites por defecto.

state.js:
Gestionar estado, localStorage y cálculos financieros.

dom.js:
Centralizar selectores del DOM.

render.js:
Renderizar cards, tablas, métricas, mensajes y alertas.

events.js:
Registrar eventos de formularios, filtros y botones.

main.js:
Inicializar la app y coordinar los módulos.

## Storage
Usar localStorage con JSON.stringify() y JSON.parse().

Guardar datos útiles:

Movimientos.
Meta de ahorro.
Límite de gasto.
Categoría seleccionada o preferencias simples.
Al cargar la página, recuperar datos guardados y renderizar automáticamente.

## Funcionalidades mínimas sugeridas
Implementar al menos 3, idealmente más:

Agregar ingresos.
Agregar gastos.
Eliminar movimientos.
Filtrar movimientos por tipo o categoría.
Calcular saldo disponible.
Calcular total de ingresos y gastos.
Calcular porcentaje de ahorro.
Guardar y recuperar datos con localStorage.
Mostrar alertas visuales si se supera el límite de gasto.
Mostrar alerta visual si no se alcanza la meta de ahorro.
Renderizar resumen financiero dinámico.


## Async y fetch
El uso de API externa es opcional. Si se usa, debe tener sentido.

Se permite usar fetch para leer un JSON local, por ejemplo categorías o consejos financieros desde assets/data/.

Si se usa fetch:

Usar async/await.
Validar response.ok.
Manejar errores con try/catch.
Mostrar errores en el DOM.
No crear API propia para este proyecto.

## Accesibilidad
Cumplir buenas prácticas básicas:

Labels en formularios.
Errores visibles.
Contraste suficiente.
Navegación clara.
Foco visible.
No depender solo del color para comunicar deuda, ahorro o alerta.
Usar texto junto con color o íconos.
Usar aria-live="polite" para mensajes dinámicos importantes.

## Git y documentación
Sugerir Conventional Commits:

feat: add expense form
feat: render financial summary
fix: correct savings warning
style: improve responsive dashboard
docs: update README
refactor: separate storage logic
El README debe incluir nombre, descripción, integrantes, idea elegida, tecnologías, funcionalidades, links, uso e información sobre IA.

El informe de IA debe explicar herramientas usadas, prompts útiles, partes asistidas, correcciones realizadas, aprendizajes y decisiones tomadas por el grupo.

## TypeScript
No implementar TypeScript en el proyecto salvo pedido explícito, porque la consigna exige JavaScript vanilla. Usar la clase de TypeScript solo como referencia conceptual para pensar mejor los tipos de datos, formas de objetos, estados y funciones.

## Checklist final
Antes de considerar listo el proyecto, verificar:

Hay 3 HTML navegables.
Hay CSS propio.
Hay media queries.
Hay JS vanilla modular.
Hay mínimo 3 funcionalidades reales.
Hay localStorage con datos útiles.
El desafío de alertas visuales está cumplido.
Los formularios validan y muestran mensajes en el DOM.
El sitio funciona en mobile y desktop.
No hay frameworks prohibidos.
El README está completo.
El informe de IA está incluido.
El deploy navega correctamente.

## Reglas de Comentarios en el Código (Estricto)
Evitar saturar el código con comentarios explicativos innecesarios u obvios. Busco un resultado estético, limpio y profesional.
- PROHIBIDO comentar cada línea de código explicando qué hace la sintaxis nativa de JS, HTML o CSS.
- El código debe ser autoexplicativo mediante el uso de nombres de variables y funciones descriptivos.
- SÓLO se permiten comentarios cortos y concisos en situaciones excepcionales: para justificar una decisión de diseño compleja, una fórmula matemática o la integración con el localStorage si es estrictamente necesario para el entendimiento del flujo general.
- Si no hay una lógica compleja, devolvé el código completamente limpio de comentarios.