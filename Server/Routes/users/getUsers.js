import client from '#db/client.js';

async function getUsers(app, optiions) {
  app.get('/users', async (req, res) => {
    try {
      const users = await client.query(`SELECT * FROM USERS`);
      app.log.info('Users retrieved are', users);
      return res.send(users.rows);
    } catch (error) {
      app.log.info(`Unable to retrieve the users`);
      return res.code(500).send({ error: 'Unable to retrieve the users' });
    }
  });
}

export default getUsers;
