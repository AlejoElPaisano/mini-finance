const fs = require('fs');
const https = require('https');
const path = require('path');

const LIST_MAP = {
  todo: 'Lista de tareas',
  doing: 'En proceso',
  done: 'Hecho'
};

function loadEnv() {
  const envPath = path.join(__dirname, '../../../.env');
  const content = fs.readFileSync(envPath, 'utf8');
  const env = {};
  content.split('\n').forEach(line => {
    const index = line.indexOf('=');
    if (index > 0) {
      const key = line.substring(0, index).trim();
      const value = line.substring(index + 1).trim();
      env[key] = value;
    }
  });
  return env;
}

function makeRequest(urlPath, method = 'GET', postData = null) {
  return new Promise((resolve, reject) => {
    const env = loadEnv();
    const separator = urlPath.includes('?') ? '&' : '?';
    const fullPath = `${urlPath}${separator}key=${env.TRELLO_API_KEY}&token=${env.TRELLO_TOKEN}`;
    const options = {
      hostname: 'api.trello.com',
      path: fullPath,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if ((method === 'PUT' || method === 'POST') && postData) {
      const body = JSON.stringify(postData);
      options.headers['Content-Length'] = Buffer.byteLength(body);
    }

    if (method === 'DELETE') {
      delete options.headers['Content-Type'];
    }

    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(data ? JSON.parse(data) : {});
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', reject);

    if ((method === 'PUT' || method === 'POST') && postData) {
      req.write(JSON.stringify(postData));
    }

    req.end();
  });
}

async function getLists(boardId) {
  return makeRequest(`/1/boards/${boardId}/lists`);
}

async function getCards(boardId) {
  return makeRequest(`/1/boards/${boardId}/cards`);
}

async function createCard(listId, name) {
  return makeRequest(`/1/cards`, 'POST', { idList: listId, name: name });
}

async function moveCard(cardId, listId) {
  return makeRequest(`/1/cards/${cardId}`, 'PUT', { idList: listId });
}

async function deleteCard(cardId) {
  return makeRequest(`/1/cards/${cardId}`, 'DELETE');
}

async function createTask(taskName, estado) {
  const env = loadEnv();
  const boardId = env.TRELLO_BOARD_ID;
  const targetListName = LIST_MAP[estado];

  if (!targetListName) {
    throw new Error(`Estado no valido: ${estado}. Use: todo, doing, done.`);
  }

  const lists = await getLists(boardId);
  const targetList = lists.find(l => l.name === targetListName);
  if (!targetList) {
    throw new Error(`Lista "${targetListName}" no encontrada en el tablero.`);
  }

  const card = await createCard(targetList.id, taskName);
  console.log(`OK: Tarjeta "${card.name}" creada en "${targetListName}".`);
}

async function moveTask(taskName, estado) {
  const env = loadEnv();
  const boardId = env.TRELLO_BOARD_ID;
  const targetListName = LIST_MAP[estado];

  if (!targetListName) {
    throw new Error(`Estado no valido: ${estado}. Use: todo, doing, done.`);
  }

  const [lists, cards] = await Promise.all([
    getLists(boardId),
    getCards(boardId)
  ]);

  const targetList = lists.find(l => l.name === targetListName);
  if (!targetList) {
    throw new Error(`Lista "${targetListName}" no encontrada en el tablero.`);
  }

  const card = cards.find(c =>
    c.name.toLowerCase().includes(taskName.toLowerCase())
  );

  if (!card) {
    throw new Error(`Tarjeta con nombre "${taskName}" no encontrada.`);
  }

  await moveCard(card.id, targetList.id);
  console.log(`OK: "${card.name}" movida a "${targetListName}".`);
}

async function deleteTask(taskName) {
  const env = loadEnv();
  const boardId = env.TRELLO_BOARD_ID;
  const cards = await getCards(boardId);

  const card = cards.find(c =>
    c.name.toLowerCase().includes(taskName.toLowerCase())
  );

  if (!card) {
    throw new Error(`Tarjeta con nombre "${taskName}" no encontrada.`);
  }

  await deleteCard(card.id);
  console.log(`OK: Tarjeta "${card.name}" eliminada.`);
}

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error('Uso: node index.js <accion> "<nombre-tarea>" [estado]');
    console.error('  accion: crear | mover | eliminar');
    console.error('  estado: todo | doing | done (solo para crear y mover)');
    process.exit(1);
  }

  const action = args[0];
  const taskName = args[1];
  const estado = args[2];

  if (action === 'crear') {
    if (!estado) {
      console.error('Error: crear requiere un estado (todo | doing)');
      process.exit(1);
    }
    createTask(taskName, estado).catch(err => {
      console.error(err.message);
      process.exit(1);
    });
  } else if (action === 'mover') {
    if (!estado) {
      console.error('Error: mover requiere un estado (todo | doing | done)');
      process.exit(1);
    }
    moveTask(taskName, estado).catch(err => {
      console.error(err.message);
      process.exit(1);
    });
  } else if (action === 'eliminar') {
    deleteTask(taskName).catch(err => {
      console.error(err.message);
      process.exit(1);
    });
  } else {
    console.error(`Accion no valida: ${action}. Use: crear, mover o eliminar.`);
    process.exit(1);
  }
}

module.exports = { createTask, moveTask, deleteTask };
