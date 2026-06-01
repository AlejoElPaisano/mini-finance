# Informe de uso de Inteligencia Artificial
**Integrante:** Karen Ledesma  
**Proyecto:** Mini Finance — Módulo Web Estática  
**Sección a cargo:** Cotizaciones del Mercado, parte de Footer

---

Aquí está el texto adaptado al tono grupal/general:

---

## 1. ¿Qué herramientas de IA utilizaron?

Se utilizó Claude (Anthropic) como herramienta de asistencia durante el desarrollo de la sección de Cotizaciones y Footer.

---

## 2. ¿Para qué las utilizaron?

Se usó principalmente para dos cosas: entender cómo trabajar correctamente con Git y GitHub durante el proyecto, y para orientarse en la integración de APIs externas dentro de Cotizaciones. Mayormente se usó como apoyo en partes puntuales donde se necesitaba guía técnica, exceptuando momentos específicos donde sí se necesitaba soporte con el código.

---

## 3. ¿Qué partes del proyecto fueron asistidas por IA?

La sección de Cotizaciones fue la parte donde más se usó IA. Específicamente ayudó a:

- Entender cómo hacer un `fetch` a una API externa y manejar la respuesta
- Decidir qué APIs usar (CoinGecko para cripto, exchangerate-api.com para divisas) y por qué cada una era viable
- Manejar errores de red mostrando mensajes en el DOM
- Entender el flujo de trabajo con ramas en Git, cómo hacer commits más estratégicos, uso correcto de push, etc.

---

## 4. ¿Qué prompts o consultas les resultaron más útiles?

Las consultas más útiles fueron las que describían el problema concreto y se analizaban las herramientas para desarrolladores, en lugar de generar código estático. Por sobre todo consultar el flujo de Git antes de ejecutar comandos, para entender qué se estaba haciendo en cada paso.

---

## 5. ¿Qué respuestas de la IA tuvieron que corregir?

Hubo varias iteraciones con las APIs. La IA inicialmente sugirió usar frankfurter.app para las tasas de cambio en tiempo real, pero desde localhost esa API bloqueaba las requests. Se tuvo que buscar una alternativa (exchangerate-api.com) que sí funcionara. También se intentó usar el endpoint de historial por fecha de esa misma API, que tampoco estaba disponible en el tier gratuito. Esos problemas se fueron resolviendo en el proceso, probando y ajustando.

---

## 6. ¿Qué problemas tuvieron al trabajar con IA?

El principal problema fue que la IA tendía a sugerir soluciones que implicaban desarrollo backend, como crear un servidor intermediario para manejar las requests a las APIs. Eso estaba fuera del alcance del proyecto. Una vez que se le dio más contexto con Skills, las sugerencias se volvieron más acotadas y útiles. También hubo problemas puntuales con APIs que fallaban desde localhost o cuyos endpoints de historial no estaban disponibles en el plan gratuito, lo que requirió buscar alternativas.

---

## 7. ¿Qué aprendieron durante el proceso?

Se aprendió que antes de elegir una API hay que verificar tres cosas: que sea gratuita, que tenga CORS abierto para usarla desde el navegador, y que los endpoints necesarios estén disponibles sin registro. También se aprendió a trabajar con ramas en Git de forma más ordenada, a escribir commits descriptivos y a no mezclar cambios de distintas funcionalidades en un mismo commit.

---

## 8. ¿Qué partes del código puede explicar cada integrante?

Se puede explicar la sección de Cotizaciones:

- **market-rates.html:** la estructura semántica de la página, el formulario de divisas con sus labels, selects e inputs, y cómo se conecta con el JS mediante IDs
- **market-rates.js:** cómo funciona el fetch a CoinGecko para traer los precios de cripto, cómo se renderizan las tarjetas dinámicamente en el DOM, cómo funciona la validación del formulario mostrando errores sin alert(), y cómo fetchForexRate obtiene la tasa real desde exchangerate-api.com
- **market-rates.css:** las variables de tokens.css reutilizadas para mantener coherencia con el resto del proyecto, y las media queries que adaptan el layout en mobile

---

## 9. ¿Qué decisiones tomó el grupo sin depender de la IA?

Las decisiones estructurales del proyecto fueron tomadas en grupo desde el principio: la elección de la idea, la distribución de secciones entre los integrantes, la paleta de colores, la tipografía y la identidad visual general del sitio. A medida que el proyecto fue avanzando también surgieron decisiones sobre cómo organizar los archivos, qué funcionalidades priorizar, cómo manejar los estados de error visualmente y qué tan compleja hacer cada sección. Esas decisiones se fueron tomando en conjunto según cómo evolucionaba el proyecto, sin consultar a la IA.

---

## 10. ¿Hubo código sugerido por IA que descartaron? ¿Por qué?

Sí. Se descartaron principalmente sugerencias que implicaban desarrollar lógica de backend, como crear servidores intermediarios o manejar autenticación de APIs desde el servidor, cosas que estaban fuera del alcance del proyecto. También hubo sugerencias de implementaciones más complejas de lo necesario que se tuvieron que simplificar para mantenerlas dentro de lo que el proyecto requería. En algún caso puntual también se descartaron integraciones con APIs que en la práctica no funcionaban como se esperaba, y se optó por alternativas más simples que sí cumplían el objetivo.

