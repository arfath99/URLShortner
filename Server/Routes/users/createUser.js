import client from '#db/client.js';

async function createUser(app, optiions) {
  app.post('/createUser', async (req, res) => {
    try {
      const username = req.body.username;
      const email = req.body.email;
      const password = req.body.password;

      await client.query(
        `INSERT INTO USERS (USERNAME, EMAIL, PASSWORD) VALUES ($1, $2, $3)`,
        [username, email, password]
      );
      return res.code(201).send('User created successfully');
    } catch (error) {
      app.log.error(`Unable to create the user`, error);
      return res.code(500).send({ error: 'Failed to create user' });
    }
  });
}

export default createUser;
