# Mini Finance

Simulador de presupuesto personal desarrollado como Proyecto Integrador del modulo de Programacion Web Estatica de IntegrarTEC 2026.

## Descripcion

Mini Finance es una aplicacion web estatica, funcional y responsive que permite registrar ingresos y gastos, clasificarlos por categoria, visualizar el saldo disponible, establecer metas de ahorro, consultar cotizaciones de criptomonedas y divisas en tiempo real, y recibir alertas visuales cuando se supera un limite de gasto o no se alcanza una meta de ahorro. Incluye un asistente virtual (Pesito) y un sistema de logros para gamificar la experiencia.

## Integrantes

- Chiressi, Francisco
- Ledesma, Karen
- Martinez Olmedo, Alejo

## Idea Elegida

**Idea 5 - Mini Finance**
- Tipo: Simulador de presupuesto personal
- Nicho: Finanzas personales

## Tecnologias Utilizadas

- HTML5 semantico
- CSS3 con Custom Properties y Media Queries
- JavaScript vanilla (modular, ES Modules)
- LocalStorage para persistencia de datos
- Google Fonts (Playfair Display, Sora, Inter)
- ApexCharts (CDN) para graficos historicos de cotizaciones
- CoinGecko API para precios de criptomonedas
- exchangerate-api.com para conversion de divisas

## Funcionalidades

### Autenticacion
- Registro de usuarios con validacion
- Inicio de sesion con persistencia de sesion en LocalStorage
- Recuperacion de contrasena
- Cierre de sesion desde menu de usuario
- Modo oscuro persistente tambien en la pagina de login

### Dashboard (Inicio)
- Metricas clave: total de ingresos, gastos, saldo y progreso de ahorro
- Panel de logros desbloqueables con modal de visualizacion
- Distribucion de gastos por categoria
- Ultimos movimientos con acceso rapido al historial completo
- Tips financieros diarios aleatorios
- Banner de cookies con aceptacion persistente

### Simulador
- Formulario de registro de ingresos y gastos con validacion
- Selector de tipo y categoria con renderizado dinamico
- Slider interactivo para meta de ahorro (escala monto/porcentaje)
- Visualizacion del monto disponible considerando reservas de ahorro
- Sistema de tabs/pestanas en mobile para alternar entre formularios
- Toasts animados de confirmacion

### Resumen Financiero
- Cards de balance contable: Ingresos, Gastos, Metas de Ahorro y Balance
- Historial de movimientos completo con filtros por tipo y categoria
- Tabla responsive con grid adaptativo a mobile

### Cotizaciones del Mercado
- Precios en tiempo real de criptomonedas (BTC, ETH, SOL, DOGE)
- Convertidor de divisas con selector de moneda de origen y destino
- Boton de intercambio de monedas
- Dashboard historico con grafico de evolucion de 30 dias (ApexCharts)
- Indicadores de variacion porcentual

### Alertas Visuales (Desafio Obligatorio)
- Alerta de tipo peligro cuando el balance es negativo
- Alerta de tipo advertencia cuando no se alcanza la meta de ahorro
- Las alertas se renderizan en el DOM sin usar alert()

### Asistente Virtual Pesito
- Chatbot flotante con arbol de decisiones interactivo
- Accesible en todas las paginas protegidas
- Interfaz mobile-first como bottom sheet y ventana flotante en desktop

### Sistema de Logros
- 12 logros desbloqueables por hitos financieros
- Modal de visualizacion con grid responsive
- Toasts de desbloqueo animados
- Persistencia en LocalStorage

### Accesibilidad
- Modo dislexia con fuente OpenDyslexic
- Modo daltonico con paleta segura (azul/naranja)
- Navegacion por teclado con skip links y focus visible
- Atributos ARIA en botones, menus, tabs y drawer de navegacion
- Menu hamburguesa responsive con aria-expanded/aria-controls

### Navegacion Responsive
- Barra de navegacion sticky con logo, enlaces y herramientas
- Menu hamburguesa con drawer lateral en mobile (< 768px)
- Overlay semitransparente, cierre con Escape, transiciones suaves
- Footer desplegable con toggle y grid adaptativo

## Links

- Repositorio: [GitHub - AlejoElPaisano/integrartec-proyecto-1](https://github.com/AlejoElPaisano/integrartec-proyecto-1)

## Instrucciones de Uso

### Acceso
1. Abrir `pages/login.html` o intentar acceder a cualquier pagina protegida
2. Registrarse con un nombre de usuario y contrasena
3. Iniciar sesion para acceder al dashboard

### Registrar Movimientos
1. Navegar a "Simulador"
2. Seleccionar tipo (Ingreso o Gasto)
3. Seleccionar categoria
4. Completar descripcion, fecha y monto
5. Hacer click en "Agregar Movimiento"

### Configurar Meta de Ahorro
1. En el simulador, seleccionar la pestana "Metas de Ahorro"
2. Ajustar el slider al monto deseado
3. Alternar entre escala absoluta y porcentual con el boton de toggle
4. Hacer click en "Agregar meta"

### Ver Resumen
1. Navegar a "Inicio" para ver el dashboard con totales y logros
2. Navegar a "Resumen" para ver historial completo con filtros

### Consultar Cotizaciones
1. Navegar a "Cotizaciones"
2. Ver precios de criptomonedas en tiempo real
3. Usar el convertidor de divisas: ingresar monto, seleccionar monedas de origen y destino, hacer click en "Consultar cotizacion"
4. El grafico historico se actualiza automaticamente con datos de 30 dias

### Usar Pesito
1. Hacer click en el icono flotante de Pesito en la esquina inferior derecha
2. Seguir las opciones del arbol de decisiones para obtener ayuda guiada

## Estructura del Proyecto

```
/
├── index.html                     # Dashboard principal
├── pages/
│   ├── login.html                 # Autenticacion (login/registro/recuperacion)
│   ├── simulador.html             # Formulario de movimientos y meta de ahorro
│   ├── resumen.html               # Resumen financiero detallado
│   └── market-rates.html          # Cotizaciones de cripto y divisas
├── base/
│   ├── scripts/
│   │   ├── config.js              # Constantes y categorias
│   │   ├── state.js               # Estado y calculos financieros
│   │   ├── dom.js                 # Selectores del DOM
│   │   ├── render.js              # Renderizado dinamico del dashboard
│   │   ├── events.js              # Event listeners de formularios y filtros
│   │   ├── main.js                # Orquestador principal e inicializacion
│   │   ├── login.js               # Logica de autenticacion
│   │   ├── footer.js              # Footer desplegable
│   │   ├── achievements.js        # Sistema de logros y condiciones
│   │   ├── pesito-brain.js        # Arbol de decisiones de Pesito
│   │   ├── pesito-chat.js         # Renderizado e interaccion del chat
│   │   ├── simulator.js           # Modulo ES del simulador
│   │   ├── resumen.js             # Modulo ES del resumen financiero
│   │   ├── market-rates.js        # API calls para cripto y forex
│   │   ├── contact-modal.js       # Modal de contacto
│   │   ├── helpers.js             # Utilidades de formato (ES Module)
│   │   ├── labels.js              # Etiquetas y signos (ES Module)
│   │   ├── local-storage.js       # Abstraccion de storage (ES Module)
│   │   └── env.example.js         # Template de claves API
│   └── styles/
│       ├── reset.css              # Reset de estilos
│       ├── tokens.css             # Variables CSS (light/dark)
│       ├── base.css               # Estilos base y tipografia
│       ├── layout.css             # Layout, nav, drawer y grids
│       ├── components.css         # Componentes reutilizables
│       ├── home.css               # Dashboard, hero, metricas y logros
│       ├── simulator.css          # Formularios, slider y tabs
│       ├── resumen.css            # Balance y ledger responsive
│       ├── market-rates.css       # Cripto grid y forex layout
│       ├── footer.css             # Footer desplegable y modal de contacto
│       ├── accessibility.css      # Herramientas de accesibilidad
│       ├── login.css              # Estilos de autenticacion
│       ├── pesito.css             # Asistente virtual flotante
│       └── main.css               # Importacion centralizada
├── assets/
│   ├── img/                       # Imagenes y logos
│   ├── icons/                     # Iconos
│   └── data/                      # Datos JSON
├── docs/
│   └── informe-uso-ia.md          # Informe de uso de IA
└── README.md                      # Este documento
```

## Uso de IA

Este proyecto fue desarrollado con asistencia de herramientas de inteligencia artificial (Claude, OpenCode). Para mas detalles sobre herramientas utilizadas, prompts empleados, partes asistidas y decisiones tomadas por el equipo, consultar `docs/informe-uso-ia.md`.
