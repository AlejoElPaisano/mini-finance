/**
 * pesito-brain.js
 * Cerebro del Asistente Virtual Pesito.
 * Árbol de decisiones con UX Writing financiero amigable.
 * Mini Finance - IntegrarTEC 2026.
 */

var pesitoBrain = {
  /**
   * Nodo Raíz: Menú Principal
   * Saludo inicial y opciones de primer nivel.
   */
  root: {
    message:
      "¡Hola! Soy Pesito, tu asistente financiero en Mini Finance. 🐷✨ " +
      "Estoy aquí para ayudarte a sacarle el máximo provecho a la app. ¿Qué te gustaría saber?",
    options: [
      { label: "¿Cómo uso el simulador de ahorros?", next: "simulador_menu" },
      { label: "¿Qué es DevCore?", next: "devcore" },
      { label: "¿Mis datos están seguros?", next: "seguridad" },
      { label: "Consejos rápidos de finanzas", next: "consejos_menu" }
    ]
  },

  /**
   * Submenú: Simulador de Ahorros
   */
  simulador_menu: {
    message:
      "El simulador es una herramienta clave para planificar. " +
      "Te permite calcular cuánto necesitás ahorrar por mes para llegar a una meta (un viaje, un auto, etc.). " +
      "¿Sobre qué parte querés saber más?",
    options: [
      { label: "Cómo crear una simulación", next: "simulador_crear" },
      { label: "Entender los resultados", next: "simulador_resultados" },
      { label: "Volver al menú principal", next: "root" }
    ]
  },

  simulador_crear: {
    message:
      "Es muy fácil: andá a la pestaña 'Simulador', escribí el monto total que necesitás, " +
      "indicá en cuántos meses querés lograrlo, y listo. La app te calculará automáticamente el ahorro mensual recomendado. " +
      "¡Podés guardar varias metas!",
    options: [
      { label: "Entendido, volver", next: "simulador_menu" }
    ]
  },

  simulador_resultados: {
    message:
      "Los resultados te muestran el monto mensual exacto que deberías destinar. " +
      "Si ves que es muy alto, probá aumentar la cantidad de meses. El objetivo es que tu meta sea realista y no te estrés.",
    options: [
      { label: "Gracias, volver", next: "simulador_menu" }
    ]
  },

  /**
   * Nodo: DevCore
   */
  devcore: {
    message:
      "DevCore es el equipo de desarrollo detrás de Mini Finance. " +
      "Somos un grupo de estudiantes apasionados por la tecnología y las finanzas personales, " +
      "creado para el proyecto de IntegrarTEC 2026. ¡Trabajamos para que manejar tu plata sea simple y visual!",
    options: [
      { label: "Volver al menú principal", next: "root" }
    ]
  },

  /**
   * Nodo: Seguridad
   */
  seguridad: {
    message:
      "Tus datos están 100% seguros. Mini Finance no usa servidores externos: " +
      "toda tu información se guarda localmente en tu navegador mediante localStorage. " +
      "Esto significa que solo vos tenés acceso a tus movimientos desde este dispositivo. Nadie más puede verlos.",
    options: [
      { label: "Volver al menú principal", next: "root" }
    ]
  },

  /**
   * Submenú: Consejos Rápidos de Finanzas
   */
  consejos_menu: {
    message:
      "¡Me encanta que quieras mejorar tus hábitos! Elegí un tema y te doy un consejo rapidito:",
    options: [
      { label: "Ahorro mensual", next: "consejo_ahorro" },
      { label: "Evitar gastos hormiga", next: "consejo_hormiga" },
      { label: "Regla 50/30/20", next: "consejo_502030" },
      { label: "Volver al menú principal", next: "root" }
    ]
  },

  consejo_ahorro: {
    message:
      "Consejo de oro: automatizá tu ahorro. El día que cobrás, transferí automáticamente un porcentaje fijo a una cuenta separada. " +
      "Si no lo ves, no lo gastás. Empezá con un 10% y aumentalo cada 3 meses.",
    options: [
      { label: "Quiero otro consejo", next: "consejos_menu" },
      { label: "Volver al menú principal", next: "root" }
    ]
  },

  consejo_hormiga: {
    message:
      "Los 'gastos hormiga' son esos pequeños gastos diarios que parecen inofensivos: un café, una app, un snack. " +
      "Juntos pueden robar hasta el 15% de tu sueldo. Mi recomendación: registrá TODO en Mini Finance durante una semana. " +
      "Ver los números en frío es un despertador brutal.",
    options: [
      { label: "Quiero otro consejo", next: "consejos_menu" },
      { label: "Volver al menú principal", next: "root" }
    ]
  },

  consejo_502030: {
    message:
      "La regla 50/30/20 es un clásico infalible: el 50% de tus ingresos va a necesidades (alquiler, comida), " +
      "el 30% a deseos (salidas, hobbies) y el 20% a ahorro o deuda. " +
      "Usá Mini Finance para etiquetar tus movimientos y ver si estás cerca de esos porcentajes.",
    options: [
      { label: "Quiero otro consejo", next: "consejos_menu" },
      { label: "Volver al menú principal", next: "root" }
    ]
  }
};
