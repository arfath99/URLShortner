import shorten from './create.js';
import getShortURLS from './getALL.js';
import deleteShortURL from './delete.js';

async function urlRoutes(app) {
  app.register(shorten, { prefix: '/url' });
  app.register(getShortURLS, { prefix: '/url' });
  app.register(deleteShortURL, { prefix: '/url' });
}

export default urlRoutes;
