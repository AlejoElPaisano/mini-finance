# Informe de Uso de Inteligencia Artificial

## Herramientas Utilizadas

- **OpenCode Desktop** (agente generalista con acceso a herramientas de sistema)
- **Skills especializadas**:
  - `frontend-design`: para estetica visual y diseño de interfaces
  - `interface-design`: para craft, consistencia y arquitectura de tokens
  - `mobile-first-design`: para enfoque responsive prioritario en mobile
  - `buenas-practica-mini-finance`: skill personalizada con reglas de la consigna oficial

## Prompts Utiles y Resultados

### Diseno del Sistema de Tokens CSS
**Prompt:** "Audita y mejora nuestro tokens.css siguiendo principios de interface-design con surface elevation, border progression y text hierarchy."

**Resultado:** Reconstruccion completa del sistema de tokens con:
- Foreground de 4 niveles (primary, secondary, tertiary, muted)
- Background/surface de 4 niveles con elevacion sutil
- Borders de 3 niveles (subtle, default, strong)
- Semantic colors (success, danger, warning)
- Motion tokens con easing de deceleracion
- Dark mode con override de primitivas semanticas

### Implementacion de Accesibilidad
**Prompt:** "Implementa botones de accesibilidad para dislexia y daltonismo con persistencia en localStorage."

**Resultado:**
- Importacion de fuente OpenDyslexic desde CDN
- Modo dislexia que fuerza font-family, line-height y letter-spacing en todo el documento
- Modo daltónico con paleta segura Vermilion/Sky Blue y bordes reforzados
- Persistencia automatica en localStorage
- Labels responsivas (ocultas en mobile, visibles en desktop)

### Sistema de Autenticacion
**Prompt:** "Desarrolla una pagina de login con tres vistas intercambiables (login, registro, recuperacion) usando JavaScript vanilla y localStorage."

**Resultado:**
- Tres vistas intercambiables dinamicamente sin recargar la pagina
- Validacion de formularios (usuario minimo 3 caracteres, contrasena minimo 4)
- Persistencia de usuarios en localStorage (clave `miniFinanceUsers`)
- Gestion de sesion (clave `miniFinanceSession`)
- Mensajes de exito/error en el DOM sin usar alert()
- Auth guard en todas las paginas protegidas

### Modulos Financieros
**Prompt:** "Implementa los modulos JavaScript financieros (config, state, dom, render, events) para registrar ingresos, gastos, calcular saldo y mostrar alertas visuales."

**Resultado:**
- 6 modulos JavaScript con responsabilidad unica
- CRUD completo de movimientos financieros
- Calculos en tiempo real (ingresos, gastos, saldo, totales por categoria)
- Alertas visuales obligatorias (limite de gasto y meta de ahorro)
- Filtros dinamicos por tipo y categoria
- Renderizado automatico al agregar/eliminar movimientos

## Partes Asistidas por IA

### Diseno Visual
- Reconstruccion completa del sistema de tokens CSS
- Implementacion de dark mode con transiciones suaves
- Diseno mobile-first con breakpoints coherentes
- Estilos de componentes (cards, botones, formularios, alertas)
- Footer desplegable tipo cajon con glassmorphism

### Arquitectura
- Estructura modular de JavaScript (config, state, dom, render, events, main)
- Separacion de responsabilidades entre modulos
- Sistema de localStorage con claves consistentes
- Manejo de estado centralizado

### Funcionalidades
- Sistema de autenticacion completo (login/registro/recuperacion)
- CRUD de movimientos financieros
- Calculos financieros con metodos de array (reduce, filter, map)
- Alertas visuales con deteccion automatica
- Filtros dinamicos con actualizacion en tiempo real
- Menu de usuario desplegable con logout

### Correcciones Realizadas
- Fix de estructura HTML rota despues de ediciones parciales
- Correccion de parpadeo del footer al navegar entre paginas
- Restauracion de logica de accesibilidad que se perdio en un rewrite
- Ajuste de rutas relativas para scripts en diferentes niveles de carpetas

## Aprendizajes y Decisiones del Grupo

### Decisiones Tecnicas
1. **Vanilla JS sobre frameworks:** La consigna exige JavaScript vanilla, lo que obligo a pensar en modularidad sin dependencias externas.
2. **localStorage como base de datos:** Elegido por simplicidad y requisito de la consigna. Permite persistencia sin backend.
3. **Mobile-first:** El enfoque de diseñar para mobile primero y luego escalar a desktop resulto en una experiencia mas solida en dispositivos pequenos.
4. **Modularidad estricta:** Separar en config/state/dom/render/events/main facilito el mantenimiento y debugging.

### Aprendizajes
1. **Accesibilidad no es opcional:** Implementar modo dislexia y daltónico desde el principio nos hizo pensar en inclusividad en cada decision de diseño.
2. **Tokens CSS son fundamentales:** Tener un sistema de tokens bien definido acelero todo el desarrollo posterior y mantuvo la consistencia.
3. **La skill de buenas practicas fue guia clave:** Seguir las reglas de la consigna paso a paso (HTML semantico, validaciones, localStorage, alertas en DOM) aseguro que no omitieramos requisitos.
4. **Git con Conventional Commits:** Establecer un patron de commits desde el inicio facilito la revision del historial.

### Desafios Encontrados
- Integrar el sistema de autenticacion con las paginas existentes sin romper la estructura
- Mantener el footer persistente (abierto/cerrado) al navegar entre paginas
- Implementar alertas visuales que se actualicen automaticamente con cada cambio de estado
- Asegurar que las rutas relativas funcionen desde diferentes niveles de carpetas (raiz vs pages/)

## Uso de IA en el Proyecto

La IA fue utilizada como asistente de desarrollo, no como reemplazo del trabajo del equipo. Las decisiones de diseno, la logica de negocio y la validacion final fueron responsabilidad de los integrantes del grupo. La IA acelero la escritura de codigo repetitivo, sugirio patrones arquitectonicos y ayudo a detectar errores estructurales.
