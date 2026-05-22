const fs = require('fs');
const https = require('https');
const path = require('path');

const LIST_MAP = {
  todo: 'Por hacer',
  doing: 'Haciendo',
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

    if (method === 'PUT' && postData) {
      const body = JSON.stringify(postData);
      options.headers['Content-Length'] = Buffer.byteLength(body);
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

    if (method === 'PUT' && postData) {
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

async function moveCard(cardId, listId) {
  return makeRequest(`/1/cards/${cardId}`, 'PUT', { idList: listId });
}

async function main(taskName, estado) {
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

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error('Uso: node index.js "<nombre-tarea>" <estado>');
    process.exit(1);
  }
  const taskName = args[0];
  const estado = args[1];
  main(taskName, estado).catch(err => {
    console.error(err.message);
    process.exit(1);
  });
}

module.exports = { main };
