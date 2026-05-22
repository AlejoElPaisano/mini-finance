---
name: trello-sync
description: Skill para sincronizar tarjetas de Trello con el progreso del proyecto Mini Finance. Permite crear tarjetas nuevas y moverlas entre columnas directamente desde el chat o la terminal.
---

# Trello Sync

Esta skill permite interactuar con el tablero de Trello del proyecto Mini Finance para gestionar tareas sin salir del entorno de desarrollo.

## Comandos Disponibles

### 1. Crear una nueva tarjeta

Cuando el usuario quiera crear una tarea nueva en el tablero, ejecutar el script de Node.js con la accion `crear`.

**Uso:**
```bash
node .agents/skills/trello-sync/index.js crear "<nombre-de-tarea>" <estado>
```

**Parametros:**
- `nombre-de-tarea`: Texto descriptivo de la tarea.
- `estado`: Columna donde se creará la tarjeta.
  - `todo` -> Lista de tareas
  - `doing` -> En proceso

**Ejemplo de uso desde terminal:**
```bash
node .agents/skills/trello-sync/index.js crear "Agregar formulario de gastos" doing
```

**Ejemplo de uso desde chat:**
Cuando el usuario diga algo como:
- "Crea una tarjeta para agregar el CSS responsive en En proceso"
- "Necesito una tarea nueva: Implementar localStorage"

Extraer el nombre de la tarea y el estado, y ejecutar el script correspondiente.

### 2. Mover una tarjeta existente

Cuando el usuario quiera cambiar el estado de una tarea ya existente, ejecutar el script con la accion `mover`.

**Uso:**
```bash
node .agents/skills/trello-sync/index.js mover "<nombre-de-tarea>" <estado>
```

**Parametros:**
- `nombre-de-tarea`: Nombre exacto o parcial de la tarjeta existente.
- `estado`: Columna destino.
  - `todo` -> Lista de tareas
  - `doing` -> En proceso
  - `done` -> Hecho

**Ejemplo de uso desde terminal:**
```bash
node .agents/skills/trello-sync/index.js mover "Agregar formulario de gastos" done
```

**Ejemplo de uso desde chat:**
Cuando el usuario diga algo como:
- "Mové la tarjeta de agregar CSS a Hecho"
- "Pasa la tarea del simulador a En proceso"
- "Terminé el formulario, mándalo a Hecho"

Buscar la tarjeta por nombre parcial y ejecutar el movimiento.

### 3. Eliminar una tarjeta

Cuando el usuario quiera eliminar una tarea del tablero, ejecutar el script con la accion `eliminar`.

**Uso:**
```bash
node .agents/skills/trello-sync/index.js eliminar "<nombre-de-tarea>"
```

**Parametros:**
- `nombre-de-tarea`: Nombre exacto o parcial de la tarjeta a eliminar.

**Ejemplo de uso desde terminal:**
```bash
node .agents/skills/trello-sync/index.js eliminar "Agregar formulario de gastos"
```

**Ejemplo de uso desde chat:**
Cuando el usuario diga algo como:
- "Eliminá la tarjeta del formulario de gastos"
- "Borrá la tarea de implementar localStorage"
- "Quiero eliminar la tarjeta del CSS responsive"

Buscar la tarjeta por nombre parcial y eliminarla permanentemente del tablero.

## Reglas de Uso

- Siempre verificar que el archivo `.env` existe en la raiz del proyecto antes de ejecutar.
- Las credenciales de Trello (API Key y Token) nunca deben mostrarse en el chat ni en logs.
- Si la tarjeta no se encuentra al intentar mover o eliminar, informar al usuario que verifique el nombre exacto en Trello.
- Si el usuario no especifica el estado al crear, preguntar si quiere crearla en "Lista de tareas" o "En proceso".
- Al mover una tarjeta a "Hecho", confirmar al usuario que la tarea fue completada exitosamente.
- Al eliminar una tarjeta, siempre pedir confirmacion al usuario antes de ejecutar la accion, ya que es irreversible.

## Mapeo de Columnas

El script usa los siguientes nombres internos que se mapean a las columnas de Trello:

| Estado (parametro) | Nombre en Trello |
|--------------------|------------------|
| `todo`             | Lista de tareas  |
| `doing`            | En proceso       |
| `done`             | Hecho            |
