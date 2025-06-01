import registerSchema from '#schemas/registerUserSchema.js';
import createUser from '#utility/Users/registerUser.js';

async function register(app, options) {
  app.post('/register', { schema: registerSchema }, async (req, res) => {
    let response = await createUser(req.body);
    app.log[response.success ? 'info' : 'error'](response.message);
    res.code(response.statusCode).send(response);
  });
}

export default register;
