import client from '#db/client.js';

async function deleteUser(app, optiions) {
  app.delete('/user:id', (req, res) => {
    try {
        client.query('')
    }
  });
}
