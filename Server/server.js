import app from './app.js';
import login from '#routes/Auth/login.js';
import register from '#routes/Auth/register.js';

import urlRoutes from '#routes/URL/index.js';

// import shorten from '#routes/URL/create.js';
// import getShortURLS from '#routes/URL/getALL.js';
// import deleteShortURL from '#routes/URL/delete.js';

const PORT = parseInt(process.env.APPLICATION_PORT, 10) || 8080;

app.register(login);
app.register(register);

app.register(urlRoutes);
// app.register(shorten);
// app.register(getShortURLS);
// app.register(deleteShortURL);

app.get('/test', (req, res) => {
  const json = {
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT, 10),
  };

  app.log.info(`The database credentials are`, json);
  res.send(json);
});

app.get('/health/live', (req, res) => {
  const uptime = process.uptime();
  const response = {
    status: 'Alive',
    uptime,
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  };

  return res.code(200).send(response);
});

const start = () => {
  try {
    app.log.info(`The server is listening at port 3000`);
    app.listen({ port: PORT });
  } catch (error) {
    app.log.error(`Error starting the server`, error);
    process.exit(1);
  }
};

start();
