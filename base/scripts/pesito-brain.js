/**
 * pesito-brain.js
 * Cerebros del Asistente Virtual Pesito por contexto de pagina.
 * Mini Finance - IntegrarTEC 2026.
 */

/* ================================================================
   CEREBRO: PAGINA DE INICIO
   ================================================================ */
var pesitoBrainHome = {
  root: {
    message:
      "Hola! Soy Pesito, tu asistente financiero. Estoy aqui para ayudarte con Mini Finance. Que queres saber?",
    options: [
      { label: "Como hago mi primer movimiento?", next: "primer_movimiento" },
      { label: "Como veo las cotizaciones?", next: "cotizaciones" },
      { label: "Que son los logros y como los desbloqueo?", next: "logros" },
      { label: "Como utilizo la pagina?", next: "uso_pagina" },
      { label: "Consejos rapidos de finanzas", next: "consejos_menu" }
    ]
  },

  primer_movimiento: {
    message:
      "Para registrar tu primer movimiento, hace clic en 'Registrar Movimiento' en el inicio o anda a la pestana Simulador. Ahi podes elegir si es un ingreso o gasto, completar los datos y guardarlo.",
    options: [
      { label: "Volver al menu", next: "root" }
    ]
  },

  cotizaciones: {
    message:
      "Anda a la pestana 'Cotizaciones' en el menu principal. Ahi vas a encontrar los valores actualizados de monedas y mercados.",
    options: [
      { label: "Volver al menu", next: "root" }
    ]
  },

  logros: {
    message:
      "Los logros son recompensas que desbloqueas al usar la app. Por ejemplo, registrando tu primer movimiento o alcanzando una meta de ahorro. Anda al Centro de Logros haciendo clic en el icono de trofeo.",
    options: [
      { label: "Volver al menu", next: "root" }
    ]
  },

  uso_pagina: {
    message:
      "La pagina de inicio te muestra un resumen de tus finanzas: ingresos, gastos, saldo y meta de ahorro. Usa el menu de arriba para navegar entre las secciones.",
    options: [
      { label: "Volver al menu", next: "root" }
    ]
  },

  consejos_menu: {
    message:
      "Me encanta que quieras mejorar tus habitos! Elegi un tema y te doy un consejo rapidito:",
    options: [
      { label: "Ahorro mensual", next: "consejo_ahorro" },
      { label: "Evitar gastos hormiga", next: "consejo_hormiga" },
      { label: "Regla 50/30/20", next: "consejo_502030" },
      { label: "Volver al menu principal", next: "root" }
    ]
  },

  consejo_ahorro: {
    message:
      "Consejo de oro: automatiza tu ahorro. El dia que cobras, transferi automaticamente un porcentaje fijo a una cuenta separada. Si no lo ves, no lo gastas. Empeza con un 10% y aumentalo cada 3 meses.",
    options: [
      { label: "Quiero otro consejo", next: "consejos_menu" },
      { label: "Volver al menu principal", next: "root" }
    ]
  },

  consejo_hormiga: {
    message:
      "Los 'gastos hormiga' son esos pequenos gastos diarios que parecen inofensivos: un cafe, una app, un snack. Juntos pueden robar hasta el 15% de tu sueldo. Mi recomendacion: registra TODO en Mini Finance durante una semana. Ver los numeros en frio es un despertador brutal.",
    options: [
      { label: "Quiero otro consejo", next: "consejos_menu" },
      { label: "Volver al menu principal", next: "root" }
    ]
  },

  consejo_502030: {
    message:
      "La regla 50/30/20 es un clasico infalible: el 50% de tus ingresos va a necesidades (alquiler, comida), el 30% a deseos (salidas, hobbies) y el 20% a ahorro o deuda. Usa Mini Finance para etiquetar tus movimientos y ver si estas cerca de esos porcentajes.",
    options: [
      { label: "Quiero otro consejo", next: "consejos_menu" },
      { label: "Volver al menu principal", next: "root" }
    ]
  }
};

/* ================================================================
   CEREBRO: PAGINA DEL SIMULADOR
   ================================================================ */
var pesitoBrainSimulator = {
  root: {
    message:
      "Hola! Soy Pesito. Estoy aqui para ayudarte con el Simulador. Que queres saber?",
    options: [
      { label: "Como registro un movimiento?", next: "registrar_movimiento" },
      { label: "Como registro una meta de ahorro?", next: "registrar_meta" },
      { label: "Como funcionan los montos de cuenta?", next: "montos_cuenta" },
      { label: "Que es la escala porcentual y en pesos?", next: "escala" },
      { label: "Consejos rapidos de finanzas", next: "consejos_menu" }
    ]
  },

  registrar_movimiento: {
    message:
      "Completa el formulario 'Registrar Movimiento'. Elegi si es un ingreso o gasto, selecciona la categoria, escribi una descripcion, el monto y la fecha. Luego hace clic en 'Agregar Movimiento'.",
    options: [
      { label: "Volver al menu", next: "root" }
    ]
  },

  registrar_meta: {
    message:
      "Usa el slider de 'Meta de Ahorro' a la derecha del formulario. Desliza para elegir el monto que queres ahorrar y hace clic en 'Agregar meta'.",
    options: [
      { label: "Volver al menu", next: "root" }
    ]
  },

  montos_cuenta: {
    message:
      "El 'Monto Total Disponible' es la suma de todos tus ingresos menos tus gastos. El 'Monto disponible dejando reservas de ahorro' te muestra cuanto te queda si respetas tu meta de ahorro.",
    options: [
      { label: "Volver al menu", next: "root" }
    ]
  },

  escala: {
    message:
      "La escala en pesos te permite fijar una meta fija (ej. $10.000). La escala porcentual te permite fijar un porcentaje de tus ingresos totales (ej. 20%). Podes cambiar entre ambas con el boton 'Cambiar a escala porcentual'.",
    options: [
      { label: "Volver al menu", next: "root" }
    ]
  },

  consejos_menu: {
    message:
      "Me encanta que quieras mejorar tus habitos! Elegi un tema y te doy un consejo rapidito:",
    options: [
      { label: "Ahorro mensual", next: "consejo_ahorro" },
      { label: "Evitar gastos hormiga", next: "consejo_hormiga" },
      { label: "Regla 50/30/20", next: "consejo_502030" },
      { label: "Volver al menu principal", next: "root" }
    ]
  },

  consejo_ahorro: {
    message:
      "Consejo de oro: automatiza tu ahorro. El dia que cobras, transferi automaticamente un porcentaje fijo a una cuenta separada. Si no lo ves, no lo gastas. Empeza con un 10% y aumentalo cada 3 meses.",
    options: [
      { label: "Quiero otro consejo", next: "consejos_menu" },
      { label: "Volver al menu principal", next: "root" }
    ]
  },

  consejo_hormiga: {
    message:
      "Los 'gastos hormiga' son esos pequenos gastos diarios que parecen inofensivos: un cafe, una app, un snack. Juntos pueden robar hasta el 15% de tu sueldo. Mi recomendacion: registra TODO en Mini Finance durante una semana. Ver los numeros en frio es un despertador brutal.",
    options: [
      { label: "Quiero otro consejo", next: "consejos_menu" },
      { label: "Volver al menu principal", next: "root" }
    ]
  },

  consejo_502030: {
    message:
      "La regla 50/30/20 es un clasico infalible: el 50% de tus ingresos va a necesidades (alquiler, comida), el 30% a deseos (salidas, hobbies) y el 20% a ahorro o deuda. Usa Mini Finance para etiquetar tus movimientos y ver si estas cerca de esos porcentajes.",
    options: [
      { label: "Quiero otro consejo", next: "consejos_menu" },
      { label: "Volver al menu principal", next: "root" }
    ]
  }
};


/* ================================================================
   CEREBRO: PAGINA DE RESUMEN
   ================================================================ */
var pesitoBrainResumen = {
  root: {
    message:
      "Hola! Soy Pesito. Estoy aqui para ayudarte con el Resumen Financiero. Que queres saber?",
    options: [
      { label: "Como funcionan los filtros?", next: "filtros" },
      { label: "Que muestra el balance contable?", next: "balance" },
      { label: "Como leo el historial de movimientos?", next: "historial" },
      { label: "Consejos rapidos de finanzas", next: "consejos_menu" }
    ]
  },

  filtros: {
    message:
      "En el Resumen podes filtrar los movimientos por tipo (Ingreso, Gasto o Meta de Ahorro) y por categoria. Selecciona los filtros que necesites y la tabla se actualiza automaticamente.",
    options: [
      { label: "Volver al menu", next: "root" }
    ]
  },

  balance: {
    message:
      "El balance contable muestra cuatro tarjetas: Ingresos totales, Gastos totales, Sumatoria de Metas de Ahorro y el Balance de Movimientos (Ingresos - Gastos). Asi podes ver tu situacion financiera de un vistazo.",
    options: [
      { label: "Volver al menu", next: "root" }
    ]
  },

  historial: {
    message:
      "El historial lista todos tus movimientos registrados con fecha, descripcion, tipo, categoria y monto. Podes filtrarlos y se muestran en orden cronologico inverso (los mas recientes primero).",
    options: [
      { label: "Volver al menu", next: "root" }
    ]
  },

  consejos_menu: {
    message:
      "Me encanta que quieras mejorar tus habitos! Elegi un tema y te doy un consejo rapidito:",
    options: [
      { label: "Ahorro mensual", next: "consejo_ahorro" },
      { label: "Evitar gastos hormiga", next: "consejo_hormiga" },
      { label: "Regla 50/30/20", next: "consejo_502030" },
      { label: "Volver al menu principal", next: "root" }
    ]
  },

  consejo_ahorro: {
    message:
      "Consejo de oro: automatiza tu ahorro. El dia que cobras, transferi automaticamente un porcentaje fijo a una cuenta separada. Si no lo ves, no lo gastas. Empeza con un 10% y aumentalo cada 3 meses.",
    options: [
      { label: "Quiero otro consejo", next: "consejos_menu" },
      { label: "Volver al menu principal", next: "root" }
    ]
  },

  consejo_hormiga: {
    message:
      "Los 'gastos hormiga' son esos pequenos gastos diarios que parecen inofensivos: un cafe, una app, un snack. Juntos pueden robar hasta el 15% de tu sueldo. Mi recomendacion: registra TODO en Mini Finance durante una semana. Ver los numeros en frio es un despertador brutal.",
    options: [
      { label: "Quiero otro consejo", next: "consejos_menu" },
      { label: "Volver al menu principal", next: "root" }
    ]
  },

  consejo_502030: {
    message:
      "La regla 50/30/20 es un clasico infalible: el 50% de tus ingresos va a necesidades (alquiler, comida), el 30% a deseos (salidas, hobbies) y el 20% a ahorro o deuda. Usa Mini Finance para etiquetar tus movimientos y ver si estas cerca de esos porcentajes.",
    options: [
      { label: "Quiero otro consejo", next: "consejos_menu" },
      { label: "Volver al menu principal", next: "root" }
    ]
  }
};
