import loginSchema from '#schemas/loginUserSchema.js';
import validateUser from '#utility/Users/loginUser.js';

async function login(app, options) {
  app.post('/login', { schema: loginSchema }, async (req, res) => {
    let response = await validateUser(req.body);
    app.log[response.success ? 'info' : 'error'](response.message);
    return res.code(response.statusCode).send(response);
  });
}

export default login;
