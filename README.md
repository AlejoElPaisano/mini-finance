# Mini Finance

Simulador de presupuesto personal desarrollado como Proyecto Integrador del modulo Web Estatica de IntegrarTEC 2026.

## Descripcion

Mini Finance es una aplicacion web estatica, funcional y responsive que permite registrar ingresos y gastos, clasificarlos por categoria, visualizar el saldo disponible y recibir alertas visuales cuando se supera un limite de gasto o no se alcanza una meta de ahorro.

## Integrantes

- Karen Ledesma
- Francisco Chiressi
- Alejo Martinez Olmedo

## Idea Elegida

**Idea 5 - Mini Finance**
- Tipo: Simulador de presupuesto personal
- Nicho: Finanzas personales
- Desafio obligatorio: Alertas visuales en el DOM cuando el usuario supere un limite de gasto o no alcance su meta de ahorro

## Tecnologias

- HTML5 semantico
- CSS3 con variables personalizadas
- JavaScript vanilla (modular)
- LocalStorage para persistencia de datos
- Google Fonts (Playfair Display + Sora)

## Funcionalidades

### Autenticacion
- Registro de usuarios con validacion
- Inicio de sesion con persistencia de sesion
- Recuperacion de contrasena
- Cierre de sesion desde menu de usuario

### Financieras
- Agregar ingresos con categoria, descripcion, fecha y monto
- Agregar gastos con categoria, descripcion, fecha y monto
- Eliminar movimientos individualmente
- Filtrar movimientos por tipo (ingreso/gasto) y categoria
- Calcular saldo disponible en tiempo real
- Calcular total de ingresos y gastos
- Establecer meta de ahorro con slider interactivo
- Visualizar monto disponible considerando la meta de ahorro

### Alertas Visuales (Desafio Obligatorio)
- Alerta de tipo peligro cuando se supera el limite de gasto
- Alerta de tipo advertencia cuando no se alcanza la meta de ahorro
- Las alertas se muestran en el DOM sin usar alert()

### Accesibilidad
- Modo dislexia con fuente OpenDyslexic
- Modo daltónico con paleta segura (Vermilion/Sky Blue)
- Dark mode persistente
- Skip links para navegacion por teclado
- Estados ARIA en botones y menus

## Estructura del Proyecto

```
/
|-- index.html                 # Dashboard principal
|-- pages/
|   |-- login.html             # Autenticacion (login/registro/recuperacion)
|   |-- simulador.html         # Formulario de movimientos y filtros
|   |-- resumen.html           # Resumen financiero detallado
|   |-- market-rates.html      # Cotizaciones (en desarrollo)
|-- base/
|   |-- scripts/
|   |   |-- config.js          # Constantes y categorias
|   |   |-- state.js           # Estado y calculos financieros
|   |   |-- dom.js             # Selectores del DOM
|   |   |-- render.js          # Renderizado dinamico
|   |   |-- events.js          # Event listeners
|   |   |-- main.js            # Orquestador principal
|   |   |-- footer.js          # Footer desplegable
|   |   |-- login.js           # Logica de autenticacion
|   |-- styles/
|   |   |-- reset.css          # Reset de estilos
|   |   |-- tokens.css         # Variables CSS
|   |   |-- base.css           # Estilos base
|   |   |-- layout.css         # Layout responsive
|   |   |-- components.css     # Componentes reutilizables
|   |   |-- footer.css         # Footer desplegable
|   |   |-- accessibility.css  # Herramientas de accesibilidad
|   |   |-- login.css          # Estilos de autenticacion
|   |   |-- simulator.css      # Estilos del simulador
|   |   |-- main.css           # Importacion centralizada
|-- assets/
|   |-- img/                   # Imagenes
|   |-- icons/                 # Iconos
|   |-- data/                  # Datos JSON
|-- docs/
|   |-- informe-uso-ia.md      # Informe de uso de IA
|-- README.md                  # Este documento
```

## Uso

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

### Ver Resumen
1. Navegar a "Inicio" para ver el dashboard con totales
2. Navegar a "Resumen" para ver historial completo y aplicar filtros

### Configurar Meta de Ahorro
1. En el simulador, ajustar el slider "Meta de Ahorro"
2. El monto considerando ahorro se actualiza automaticamente

## Repositorio

[GitHub - AlejoElPaisano/integrartec-proyecto-1](https://github.com/AlejoElPaisano/integrartec-proyecto-1)

## Informacion sobre IA

Este proyecto fue desarrollado con asistencia de herramientas de inteligencia artificial. Para mas detalles, consultar `docs/informe-uso-ia.md`.
